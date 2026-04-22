import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/link-button";
import { PageShell } from "@/components/page-shell";
import { TARGET_COUNTRIES, SMS_GATEWAYS } from "@/lib/countries";

export const metadata: Metadata = {
  title: "How to tweet by SMS",
  description: "Three minutes from zero to posting on X without internet.",
};

export default function HowToPage() {
  return (
    <PageShell
      eyebrow="How to"
      title="Three minutes to your first offline tweet."
      lead="No app, no reading documentation. Do it once and forget us until the network dies."
    >
      <ol className="space-y-10">
        <Step
          n="1"
          title="Connect your X account"
          body="Click Connect. You'll be bounced to X for OAuth 2.0. Approve the `tweet.write` and `users.read` scopes. We never ask for DMs. When you land back on OffX, your handle appears in the top-right."
        />
        <Step
          n="2"
          title="Verify your phone"
          body="Enter your number in E.164 format (e.g. +33612345678). We send a 6-digit code over Twilio Verify. Type it back, and your phone is now the key to your X account in our system."
        />
        <Step
          n="3"
          title="Save our number"
          body={`Add ${SMS_GATEWAYS[0].e164} to your contacts as "OffX". That's a US long code that works from any network with outbound international SMS, which is most networks, even during partial shutdowns.`}
        />
        <Step
          n="4"
          title="Text to post"
          body="Anything you text to that number becomes a tweet on your account within seconds. We append ` Via @OffXorg` to attribute the bridge. If the tweet would exceed 280 characters with the suffix, we trim your message, not the attribution."
        />
        <Step
          n="5"
          title="Receive your confirmation"
          body="We reply to your SMS with the URL of the tweet we just posted. If anything fails (rate limit, token expired, content blocked), the reply tells you why in one short sentence."
        />
      </ol>

      <div className="mt-14 rounded-2xl border border-border bg-surface p-6">
        <h3 className="text-lg font-semibold text-foreground">
          Where this matters most
        </h3>
        <p className="mt-3 text-sm text-muted">
          OffX is free for anyone. Our shortlist of countries where an
          SMS-to-X bridge is an actual lifeline:
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {TARGET_COUNTRIES.map((c) => (
            <li
              key={c.iso}
              className="flex items-center gap-3 text-sm"
            >
              <span className="text-xl leading-none" aria-hidden>
                {c.flag}
              </span>
              <span className="text-foreground">{c.name}</span>
              <span className="font-mono text-xs text-muted">{c.dial}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h3 className="text-lg font-semibold text-foreground">
          Limits you should know
        </h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <span className="text-foreground">10 tweets per hour, 50 per day.</span>{" "}
            Anti-spam and a courtesy to X's API.
          </li>
          <li>
            <span className="text-foreground">280 characters including ` Via @OffXorg`.</span>{" "}
            Longer SMS get trimmed from the front.
          </li>
          <li>
            <span className="text-foreground">One phone = one X account.</span>{" "}
            If you need to rotate, revoke from your dashboard first.
          </li>
          <li>
            <span className="text-foreground">Content we refuse:</span> anything
            that violates X's rules or promotes real-world harm.
          </li>
        </ul>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <LinkButton href="/connect" size="lg">
          Connect now
        </LinkButton>
        <LinkButton href="/manifesto" size="lg" variant="secondary">
          Read the manifesto
        </LinkButton>
      </div>
    </PageShell>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="flex gap-6">
      <div className="shrink-0 font-mono text-sm text-accent">{n}</div>
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-2">{body}</p>
      </div>
    </li>
  );
}
