import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { readSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";
import { ConnectXStep } from "@/components/connect/connect-x-step";
import { ConnectPhoneStep } from "@/components/connect/connect-phone-step";
import { ConnectSuccess } from "@/components/connect/connect-success";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Link your X account and your phone so OffX can tweet for you over SMS.",
};

type SearchParams = Promise<{ step?: string; error?: string }>;

export default async function ConnectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { step, error } = await searchParams;
  const session = await readSession();

  let user = null;
  if (session) {
    const sb = supabaseAdmin();
    const { data } = await sb
      .from("users")
      .select("id, x_handle, phone_e164, phone_verified_at")
      .eq("id", session.userId)
      .maybeSingle();
    user = data;
  }

  if (user?.phone_verified_at) {
    redirect("/dashboard");
  }

  const currentStep: 1 | 2 =
    session && user && step === "phone" ? 2 : 1;

  return (
    <>
      <Navbar />
      <main className="flex-1 py-20">
        <Container className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Connect
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Two steps. Then you can text your tweets.
          </h1>
          <p className="mt-4 text-muted">
            Step 1 links your X account via OAuth. Step 2 verifies your phone
            with a one-time code. We keep the minimum: your handle, your number,
            and an encrypted X token.
          </p>

          <div className="mt-10 flex items-center gap-3 text-xs">
            <Badge variant={currentStep >= 1 ? "accent" : "muted"}>
              Step 1 · X account
            </Badge>
            <div className="h-px w-8 bg-border" />
            <Badge variant={currentStep >= 2 ? "accent" : "muted"}>
              Step 2 · Phone
            </Badge>
          </div>

          {error ? (
            <div className="mt-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {humanError(error)}
            </div>
          ) : null}

          <div className="mt-10">
            {currentStep === 1 ? (
              <ConnectXStep />
            ) : user ? (
              user.phone_verified_at ? (
                <ConnectSuccess handle={user.x_handle} />
              ) : (
                <ConnectPhoneStep handle={user.x_handle} />
              )
            ) : null}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function humanError(code: string): string {
  switch (code) {
    case "state_mismatch":
      return "Security check failed. Please restart the connection from step 1.";
    case "missing_code":
      return "X didn't return an authorization code. Try again.";
    case "token_exchange_failed":
      return "We couldn't exchange the code with X. Check your X Developer app credentials.";
    case "profile_fetch_failed":
      return "We couldn't read your X profile. Rare, try again.";
    case "db_upsert_failed":
      return "Database error while creating your account. Try again.";
    case "access_denied":
      return "You declined the permission on X. Reconnect to continue.";
    default:
      return `Error: ${code}`;
  }
}
