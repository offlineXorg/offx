import { randomBytes, createHash } from "crypto";
import { env, xRedirectUri } from "@/lib/env";
import { supabaseAdmin, type UserRow } from "@/lib/supabase";

const AUTHORIZE_URL = "https://x.com/i/oauth2/authorize";
const TOKEN_URL = "https://api.x.com/2/oauth2/token";
const ME_URL = "https://api.x.com/2/users/me";
const TWEETS_URL = "https://api.x.com/2/tweets";

export const X_SCOPES = [
  "tweet.read",
  "tweet.write",
  "users.read",
  "offline.access",
].join(" ");

export function generateCodeVerifier(): string {
  return base64url(randomBytes(32));
}

export function generateCodeChallenge(verifier: string): string {
  return base64url(createHash("sha256").update(verifier).digest());
}

export function generateState(): string {
  return base64url(randomBytes(24));
}

export function buildAuthorizeUrl(opts: {
  state: string;
  codeChallenge: string;
}): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.x.clientId(),
    redirect_uri: xRedirectUri(),
    scope: X_SCOPES,
    state: opts.state,
    code_challenge: opts.codeChallenge,
    code_challenge_method: "S256",
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

function basicAuthHeader(): string {
  const raw = `${env.x.clientId()}:${env.x.clientSecret()}`;
  return `Basic ${Buffer.from(raw).toString("base64")}`;
}

type TokenResponse = {
  token_type: "bearer";
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token: string;
};

export async function exchangeCodeForTokens(opts: {
  code: string;
  codeVerifier: string;
}): Promise<TokenResponse> {
  const body = new URLSearchParams({
    code: opts.code,
    grant_type: "authorization_code",
    client_id: env.x.clientId(),
    redirect_uri: xRedirectUri(),
    code_verifier: opts.codeVerifier,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`X token exchange failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function refreshTokens(
  refreshToken: string,
): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: env.x.clientId(),
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`X token refresh failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function fetchMe(accessToken: string): Promise<{
  id: string;
  username: string;
  name: string;
}> {
  const res = await fetch(ME_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`X /users/me failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  return { id: data.data.id, username: data.data.username, name: data.data.name };
}

export async function postTweet(
  accessToken: string,
  text: string,
): Promise<{ id: string; text: string }> {
  const res = await fetch(TWEETS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
    cache: "no-store",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new XApiError(res.status, errorText);
  }
  const json = await res.json();
  return { id: json.data.id, text: json.data.text };
}

export class XApiError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`X API error ${status}: ${body}`);
    this.status = status;
    this.body = body;
  }
}

export async function ensureFreshAccessToken(user: UserRow): Promise<string> {
  const expiresAt = new Date(user.x_token_expires_at).getTime();
  const skew = 60_000;
  if (Date.now() < expiresAt - skew) {
    return user.x_access_token;
  }
  const tokens = await refreshTokens(user.x_refresh_token);
  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000);
  const sb = supabaseAdmin();
  const { error } = await sb
    .from("users")
    .update({
      x_access_token: tokens.access_token,
      x_refresh_token: tokens.refresh_token,
      x_token_expires_at: newExpiresAt.toISOString(),
    })
    .eq("id", user.id);
  if (error) throw new Error(`Failed to persist refreshed X token: ${error.message}`);
  return tokens.access_token;
}

function base64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
