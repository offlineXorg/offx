import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin, type UserRow } from "@/lib/supabase";
import { validateInboundSignature } from "@/lib/twilio";
import { env } from "@/lib/env";
import {
  ensureFreshAccessToken,
  postTweet,
  uploadMedia,
  XApiError,
} from "@/lib/x";
import { composeTweet, isBlockedContent } from "@/lib/tweet-compose";
import { check as checkRate, record as recordRate } from "@/lib/rate-limit";

const SUPPORTED_MEDIA_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
]);
const MAX_MEDIA_PER_TWEET = 4;

async function fetchTwilioMedia(mediaUrl: string): Promise<{
  buffer: Buffer;
  contentType: string;
} | null> {
  const auth = Buffer.from(
    `${env.twilio.accountSid()}:${env.twilio.authToken()}`,
  ).toString("base64");
  const res = await fetch(mediaUrl, {
    headers: { Authorization: `Basic ${auth}` },
    redirect: "follow",
    cache: "no-store",
  });
  if (!res.ok) return null;
  const contentType = (
    res.headers.get("content-type") ?? "application/octet-stream"
  )
    .split(";")[0]
    .trim()
    .toLowerCase();
  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, contentType };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function twiml(message?: string): NextResponse {
  const body = message
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(
        message,
      )}</Message></Response>`
    : `<?xml version="1.0" encoding="UTF-8"?><Response/>`;
  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const params = Object.fromEntries(new URLSearchParams(rawBody).entries());
  const signature = req.headers.get("x-twilio-signature");

  const proto =
    req.headers.get("x-forwarded-proto") ??
    (env.appUrl.startsWith("https") ? "https" : "http");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const url = host
    ? `${proto}://${host}${req.nextUrl.pathname}`
    : `${env.appUrl}${req.nextUrl.pathname}`;

  const valid = validateInboundSignature({ signature, url, params });
  if (!valid) {
    return new NextResponse("Invalid signature", { status: 403 });
  }

  const from = params.From;
  const body = (params.Body ?? "").trim();
  const numMedia = Number.parseInt(params.NumMedia ?? "0", 10) || 0;
  if (!from || (!body && numMedia === 0)) return twiml();

  const sb = supabaseAdmin();
  const { data: user, error: userErr } = await sb
    .from("users")
    .select("*")
    .eq("phone_e164", from)
    .eq("is_active", true)
    .maybeSingle();

  if (userErr) {
    return twiml("OffX: server error. Try again in a minute.");
  }
  if (!user || !user.phone_verified_at) {
    return twiml(
      `OffX: this number isn't linked to an X account. Visit ${env.appUrl} to set up.`,
    );
  }

  if (isBlockedContent(body)) {
    await logTweet({
      userId: user.id,
      body,
      status: "blocked",
      error: "content_policy",
    });
    return twiml("OffX: your message was blocked by our content policy.");
  }

  const rate = checkRate(from);
  if (!rate.ok) {
    await logTweet({
      userId: user.id,
      body,
      status: "rate_limited",
      error: rate.reason ?? null,
    });
    const minutes = Math.ceil((rate.retryAfterMs ?? 0) / 60_000);
    return twiml(
      `OffX: rate limit reached (${rate.reason}). Try again in ~${minutes} min.`,
    );
  }

  const tweetText = composeTweet(body);

  let accessToken: string;
  try {
    accessToken = await ensureFreshAccessToken(user as UserRow);
  } catch {
    await logTweet({
      userId: user.id,
      body,
      status: "failed",
      error: "token_refresh_failed",
    });
    return twiml(
      `OffX: your X session expired. Reconnect at ${env.appUrl}/connect.`,
    );
  }

  const mediaIds: string[] = [];
  if (numMedia > 0) {
    const slots = Math.min(numMedia, MAX_MEDIA_PER_TWEET);
    for (let i = 0; i < slots; i++) {
      const mediaUrl = params[`MediaUrl${i}`];
      const declared = (params[`MediaContentType${i}`] ?? "")
        .toLowerCase()
        .split(";")[0]
        .trim();
      if (!mediaUrl) continue;
      const fetched = await fetchTwilioMedia(mediaUrl).catch(() => null);
      if (!fetched) continue;
      const mime = SUPPORTED_MEDIA_TYPES.has(declared)
        ? declared
        : fetched.contentType;
      if (!SUPPORTED_MEDIA_TYPES.has(mime)) continue;
      try {
        const id = await uploadMedia(accessToken, fetched.buffer, mime);
        mediaIds.push(id);
      } catch {
        // skip this one, keep going
      }
    }
  }

  if (numMedia > 0 && mediaIds.length === 0 && !body) {
    await logTweet({
      userId: user.id,
      body: "[MMS]",
      status: "failed",
      error: "media_upload_failed",
    });
    return twiml("OffX: we couldn't upload your photo(s). Try sending text instead.");
  }

  try {
    const tweet = await postTweet(accessToken, tweetText, mediaIds);
    recordRate(from);
    await logTweet({
      userId: user.id,
      tweetId: tweet.id,
      body: tweetText,
      status: "posted",
      mediaCount: mediaIds.length,
    });
    const url = `https://x.com/${user.x_handle}/status/${tweet.id}`;
    const mediaSuffix =
      mediaIds.length > 0
        ? ` (${mediaIds.length} photo${mediaIds.length > 1 ? "s" : ""})`
        : "";
    return twiml(`OffX: posted${mediaSuffix} · ${url}`);
  } catch (err) {
    const status = err instanceof XApiError ? err.status : 0;
    const msg =
      status === 429
        ? "X rate-limited your account. Wait a few minutes."
        : status === 401
          ? "X rejected the token. Reconnect at /connect."
          : status === 403
            ? "X refused the tweet (duplicate or policy)."
            : "Unknown error from X. We logged it.";
    await logTweet({
      userId: user.id,
      body: tweetText,
      status: "failed",
      error: err instanceof Error ? err.message.slice(0, 500) : "unknown",
    });
    return twiml(`OffX: ${msg}`);
  }
}

async function logTweet(opts: {
  userId: string;
  tweetId?: string;
  body: string;
  status: "posted" | "failed" | "rate_limited" | "blocked";
  error?: string | null;
  mediaCount?: number;
}): Promise<void> {
  const sb = supabaseAdmin();
  await sb.from("tweets_log").insert({
    user_id: opts.userId,
    tweet_id: opts.tweetId ?? null,
    body: opts.body.slice(0, 1000),
    status: opts.status,
    error: opts.error ?? null,
    media_count: opts.mediaCount ?? 0,
  });
}
