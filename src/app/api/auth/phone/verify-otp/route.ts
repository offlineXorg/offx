import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/session";
import { verifyOtp } from "@/lib/otp";
import { supabaseAdmin } from "@/lib/supabase";
import { formatPhoneE164 } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  phone: z.string().min(6).max(20),
  code: z.string().min(4).max(10),
});

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

  let approved = false;
  try {
    approved = await verifyOtp(e164, parsed.code);
  } catch (err) {
    return NextResponse.json(
      {
        error: "otp_check_failed",
        detail: err instanceof Error ? err.message : "unknown",
      },
      { status: 502 },
    );
  }
  if (!approved) {
    return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  }

  const sb = supabaseAdmin();

  const { data: existing } = await sb
    .from("users")
    .select("id")
    .eq("phone_e164", e164)
    .maybeSingle();

  if (existing && existing.id !== session.userId) {
    return NextResponse.json(
      { error: "phone_already_linked" },
      { status: 409 },
    );
  }

  const { error } = await sb
    .from("users")
    .update({
      phone_e164: e164,
      phone_verified_at: new Date().toISOString(),
      is_active: true,
    })
    .eq("id", session.userId);

  if (error) {
    return NextResponse.json(
      { error: "db_update_failed", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
