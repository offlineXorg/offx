import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";

const SESSION_COOKIE = "offx_session";
const OAUTH_COOKIE = "offx_oauth";
const SESSION_TTL = "30d";

function secret(): Uint8Array {
  return new TextEncoder().encode(env.sessionSecret());
}

export type SessionPayload = {
  userId: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(secret());
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.userId !== "string") return null;
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function readSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export type OAuthState = {
  state: string;
  codeVerifier: string;
};

export async function signOAuthState(data: OAuthState): Promise<string> {
  return new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret());
}

export async function setOAuthCookie(token: string) {
  const store = await cookies();
  store.set(OAUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
}

export async function readOAuthCookie(): Promise<OAuthState | null> {
  const store = await cookies();
  const token = store.get(OAUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (
      typeof payload.state !== "string" ||
      typeof payload.codeVerifier !== "string"
    )
      return null;
    return { state: payload.state, codeVerifier: payload.codeVerifier };
  } catch {
    return null;
  }
}

export async function clearOAuthCookie() {
  const store = await cookies();
  store.delete(OAUTH_COOKIE);
}
