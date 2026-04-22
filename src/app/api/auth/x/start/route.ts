import { NextResponse } from "next/server";
import {
  buildAuthorizeUrl,
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
} from "@/lib/x";
import { setOAuthCookie, signOAuthState } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);

  const cookieToken = await signOAuthState({ state, codeVerifier });
  await setOAuthCookie(cookieToken);

  const authorizeUrl = buildAuthorizeUrl({ state, codeChallenge });
  return NextResponse.redirect(authorizeUrl);
}
