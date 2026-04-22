"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DashboardActions() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function doLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function doDelete() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/delete", { method: "POST" });
      if (!res.ok) throw new Error("delete_failed");
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-6">
      <div>
        <h3 className="text-lg font-semibold">Manage your account</h3>
        <p className="mt-1 text-sm text-muted">
          Log out on this device, or delete your OffX link completely.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={doLogout} disabled={loading}>
          Log out
        </Button>
        {!confirming ? (
          <Button
            variant="outline"
            onClick={() => setConfirming(true)}
            disabled={loading}
          >
            Delete account
          </Button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Are you sure?</span>
            <Button variant="danger" onClick={doDelete} disabled={loading}>
              {loading ? "Deleting..." : "Yes, delete"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setConfirming(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <p className="text-xs text-muted">
        Deleting removes your row from our database and stops any future SMS
        from being tweeted. You can also revoke from X directly, under Settings
        → Apps &amp; sessions.
      </p>
    </div>
  );
}
