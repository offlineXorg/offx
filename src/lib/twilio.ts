import Twilio from "twilio";
import { env } from "@/lib/env";

let cached: ReturnType<typeof Twilio> | null = null;

function client() {
  if (cached) return cached;
  cached = Twilio(env.twilio.accountSid(), env.twilio.authToken());
  return cached;
}

export async function sendOtpSms(
  phoneE164: string,
  code: string,
): Promise<void> {
  await client().messages.create({
    to: phoneE164,
    from: env.twilio.phoneNumber(),
    body: `OffX verification code: ${code}. Valid 5 minutes. Don't share it.`,
  });
}

export async function sendReply(
  to: string,
  message: string,
): Promise<void> {
  await client().messages.create({
    to,
    from: env.twilio.phoneNumber(),
    body: message,
  });
}

export function validateInboundSignature(opts: {
  signature: string | null;
  url: string;
  params: Record<string, string>;
}): boolean {
  if (!opts.signature) return false;
  return Twilio.validateRequest(
    env.twilio.authToken(),
    opts.signature,
    opts.url,
    opts.params,
  );
}
