import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin, type UserRow } from "@/lib/supabase";
import { validateInboundSignature } from "@/lib/twilio";
import { env } from "@/lib/env";
import { ensureFreshAccessToken, postTweet, XApiError } from "@/lib/x";
import { composeTweet, isBlockedContent } from "@/lib/tweet-compose";
import { check as checkRate, record as recordRate } from "@/lib/rate-limit";

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
  if (!from || !body) return twiml();

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

  try {
    const tweet = await postTweet(accessToken, tweetText);
    recordRate(from);
    await logTweet({
      userId: user.id,
      tweetId: tweet.id,
      body: tweetText,
      status: "posted",
    });
    const url = `https://x.com/${user.x_handle}/status/${tweet.id}`;
    return twiml(`OffX: posted · ${url}`);
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
}): Promise<void> {
  const sb = supabaseAdmin();
  await sb.from("tweets_log").insert({
    user_id: opts.userId,
    tweet_id: opts.tweetId ?? null,
    body: opts.body.slice(0, 1000),
    status: opts.status,
    error: opts.error ?? null,
  });
}
