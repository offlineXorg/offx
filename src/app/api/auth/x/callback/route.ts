import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";
import { exchangeCodeForTokens, fetchMe } from "@/lib/x";
import {
  clearOAuthCookie,
  readOAuthCookie,
  setSessionCookie,
  signSession,
} from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const xError = url.searchParams.get("error");

  const failUrl = new URL("/connect", env.appUrl);

  if (xError) {
    failUrl.searchParams.set("error", xError);
    return NextResponse.redirect(failUrl);
  }

  if (!code || !state) {
    failUrl.searchParams.set("error", "missing_code");
    return NextResponse.redirect(failUrl);
  }

  const cookieData = await readOAuthCookie();
  if (!cookieData || cookieData.state !== state) {
    failUrl.searchParams.set("error", "state_mismatch");
    return NextResponse.redirect(failUrl);
  }

  let tokens;
  try {
    tokens = await exchangeCodeForTokens({
      code,
      codeVerifier: cookieData.codeVerifier,
    });
  } catch {
    failUrl.searchParams.set("error", "token_exchange_failed");
    return NextResponse.redirect(failUrl);
  }

  let me;
  try {
    me = await fetchMe(tokens.access_token);
  } catch {
    failUrl.searchParams.set("error", "profile_fetch_failed");
    return NextResponse.redirect(failUrl);
  }

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();
  const sb = supabaseAdmin();

  const { data: upserted, error } = await sb
    .from("users")
    .upsert(
      {
        x_user_id: me.id,
        x_handle: me.username,
        x_access_token: tokens.access_token,
        x_refresh_token: tokens.refresh_token,
        x_token_expires_at: expiresAt,
      },
      { onConflict: "x_user_id" },
    )
    .select("id")
    .single();

  if (error || !upserted) {
    failUrl.searchParams.set("error", "db_upsert_failed");
    return NextResponse.redirect(failUrl);
  }

  const sessionToken = await signSession({ userId: upserted.id });
  await setSessionCookie(sessionToken);
  await clearOAuthCookie();

  const next = new URL("/connect", env.appUrl);
  next.searchParams.set("step", "phone");
  return NextResponse.redirect(next);
}
