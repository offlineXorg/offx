import { NextResponse } from "next/server";
import { clearSessionCookie, readSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }
  const sb = supabaseAdmin();
  const { error } = await sb.from("users").delete().eq("id", session.userId);
  if (error) {
    return NextResponse.json(
      { error: "db_delete_failed", detail: error.message },
      { status: 500 },
    );
  }
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
