import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { readSession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your OffX link status and recent SMS-tweets.",
};

export default async function DashboardPage() {
  const session = await readSession();
  if (!session) redirect("/connect");

  const sb = supabaseAdmin();
  const { data: user } = await sb
    .from("users")
    .select("x_handle, phone_e164, phone_verified_at, created_at")
    .eq("id", session.userId)
    .maybeSingle();

  if (!user) redirect("/connect");
  if (!user.phone_verified_at) redirect("/connect?step=phone");

  const { data: logs } = await sb
    .from("tweets_log")
    .select("id, tweet_id, body, status, error, created_at")
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false })
    .limit(20);

  const offxNumber = process.env.TWILIO_PHONE_NUMBER ?? "+1 415 555 0108";

  return (
    <>
      <Navbar />
      <main className="flex-1 py-20">
        <Container className="max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                @{user.x_handle} is connected.
              </h1>
            </div>
            <Badge variant="success">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" />
              Active
            </Badge>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Card
              label="Your phone"
              value={<span className="font-mono">{user.phone_e164}</span>}
            />
            <Card
              label="OffX SMS number"
              value={<span className="font-mono">{offxNumber}</span>}
              hint="Save as contact `OffX`"
            />
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">
              Recent SMS-tweets
            </h2>
            {logs && logs.length > 0 ? (
              <ul className="mt-4 divide-y divide-border">
                {logs.map((log) => (
                  <li
                    key={log.id}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-muted-strong">
                        {log.body}
                      </p>
                      {log.error ? (
                        <p className="mt-1 text-xs text-danger">
                          {log.error}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <Badge
                        variant={
                          log.status === "posted"
                            ? "success"
                            : log.status === "blocked" ||
                                log.status === "rate_limited"
                              ? "muted"
                              : "muted"
                        }
                      >
                        {log.status}
                      </Badge>
                      <time dateTime={log.created_at}>
                        {new Date(log.created_at).toLocaleString()}
                      </time>
                      {log.tweet_id ? (
                        <Link
                          href={`https://x.com/${user.x_handle}/status/${log.tweet_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent hover:underline"
                        >
                          view
                        </Link>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">
                No tweets yet. Text your first SMS to{" "}
                <span className="font-mono text-foreground">{offxNumber}</span>{" "}
                to see it here.
              </p>
            )}
          </div>

          <div className="mt-10">
            <DashboardActions />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Card({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="text-xs uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className="mt-2 text-lg text-foreground">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted">{hint}</div> : null}
    </div>
  );
}
