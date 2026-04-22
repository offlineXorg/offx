"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ConnectPhoneStep({ handle }: { handle: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"enter" | "confirm" | "done">("enter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendOtp() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/phone/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "unknown");
      setStage("confirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setLoading(false);
    }
  }

  async function verify() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/phone/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "unknown");
      setStage("done");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Verify your phone</h2>
        <span className="text-sm text-muted">
          Signed in as{" "}
          <span className="text-foreground">@{handle}</span>
        </span>
      </div>
      <p className="mt-3 text-muted">
        Use the phone you&apos;ll actually text from. International format,
        e.g. <span className="font-mono">+33612345678</span>.
      </p>

      {stage === "enter" ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+33612345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 flex-1 rounded-full border border-border bg-background px-5 font-mono text-sm text-foreground outline-none ring-0 transition focus:border-accent"
          />
          <Button
            onClick={sendOtp}
            size="lg"
            disabled={loading || phone.length < 6}
          >
            {loading ? "Sending..." : "Send code"}
          </Button>
        </div>
      ) : null}

      {stage === "confirm" ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, ""))}
            className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-center font-mono text-lg tracking-[0.5em] text-foreground outline-none transition focus:border-accent"
            maxLength={6}
          />
          <Button
            onClick={verify}
            size="lg"
            disabled={loading || code.length < 4}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      ) : null}

      {stage === "confirm" ? (
        <button
          onClick={sendOtp}
          className="mt-4 text-sm text-muted hover:text-foreground"
          disabled={loading}
        >
          Resend code
        </button>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <p className="mt-6 text-xs text-muted">
        Standard carrier rates apply for the one-time SMS. Codes are hashed,
        valid five minutes, and erased after you verify.
      </p>
    </div>
  );
}
