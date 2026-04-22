import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/session";
import { sendOtpSms } from "@/lib/twilio";
import { issueOtp } from "@/lib/otp";
import { formatPhoneE164 } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({ phone: z.string().min(6).max(20) });

export async function POST(req: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const e164 = formatPhoneE164(parsed.phone);
  if (!e164) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  let issued;
  try {
    issued = await issueOtp(e164);
  } catch (err) {
    return NextResponse.json(
      {
        error: "otp_issue_failed",
        detail: err instanceof Error ? err.message : "unknown",
      },
      { status: 500 },
    );
  }
  if (!issued.ok) {
    return NextResponse.json(
      { error: "rate_limited", retry_after_minutes: 15 },
      { status: 429 },
    );
  }

  try {
    await sendOtpSms(e164, issued.code);
  } catch (err) {
    return NextResponse.json(
      {
        error: "otp_send_failed",
        detail: err instanceof Error ? err.message : "unknown",
      },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, phone: e164 });
}
