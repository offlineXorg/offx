import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

const OTP_TTL_MINUTES = 5;
const MAX_ATTEMPTS = 5;
const MAX_RECENT_SENDS = 3;
const RECENT_WINDOW_MINUTES = 15;

function generateCode(): string {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function hashCode(code: string): string {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export type IssueOtpResult =
  | { ok: true; code: string }
  | { ok: false; error: "rate_limited" };

export async function issueOtp(phoneE164: string): Promise<IssueOtpResult> {
  const sb = supabaseAdmin();
  const cutoff = new Date(
    Date.now() - RECENT_WINDOW_MINUTES * 60_000,
  ).toISOString();

  const { count, error: countErr } = await sb
    .from("phone_otps")
    .select("id", { count: "exact", head: true })
    .eq("phone_e164", phoneE164)
    .gte("created_at", cutoff);
  if (countErr) throw new Error(`otp_count_failed: ${countErr.message}`);
  if ((count ?? 0) >= MAX_RECENT_SENDS) {
    return { ok: false, error: "rate_limited" };
  }

  const code = generateCode();
  const { error: insertErr } = await sb.from("phone_otps").insert({
    phone_e164: phoneE164,
    code_hash: hashCode(code),
    expires_at: new Date(Date.now() + OTP_TTL_MINUTES * 60_000).toISOString(),
  });
  if (insertErr) throw new Error(`otp_insert_failed: ${insertErr.message}`);

  return { ok: true, code };
}

export async function verifyOtp(
  phoneE164: string,
  code: string,
): Promise<boolean> {
  const sb = supabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data, error } = await sb
    .from("phone_otps")
    .select("id, code_hash, attempts, expires_at")
    .eq("phone_e164", phoneE164)
    .is("verified_at", null)
    .gte("expires_at", nowIso)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`otp_lookup_failed: ${error.message}`);
  if (!data) return false;
  if (data.attempts >= MAX_ATTEMPTS) return false;

  const expected = Buffer.from(data.code_hash, "hex");
  const provided = crypto.createHash("sha256").update(code).digest();
  const match =
    expected.length === provided.length &&
    crypto.timingSafeEqual(expected, provided);

  if (!match) {
    await sb
      .from("phone_otps")
      .update({ attempts: data.attempts + 1 })
      .eq("id", data.id);
    return false;
  }

  await sb
    .from("phone_otps")
    .update({ verified_at: nowIso })
    .eq("id", data.id);
  return true;
}
