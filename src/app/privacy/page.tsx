import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What OffX stores, for how long, and what it refuses to collect.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy Policy"
      title="The minimum data we need, for the minimum time."
      lead="Last updated: April 2026. Written to be read, not to be skipped."
    >
      <p>
        OffX is a non-profit service that posts tweets on your X account when
        you send an SMS to our shared number. This policy explains what we
        collect, why, where it lives, and how to erase it.
      </p>

      <h2 className="!mt-12 text-2xl font-semibold text-foreground">
        What we store
      </h2>
      <ul className="space-y-3">
        <li>
          <strong className="text-foreground">Your X user ID and handle.</strong>{" "}
          Received from X OAuth. Used to post on your behalf and show you your
          account in the dashboard.
        </li>
        <li>
          <strong className="text-foreground">Your X access + refresh token.</strong>{" "}
          Encrypted at rest. Used only to POST tweets you requested over SMS.
        </li>
        <li>
          <strong className="text-foreground">Your phone number (E.164).</strong>{" "}
          The lookup key when an inbound SMS lands on our number. Never shared.
        </li>
        <li>
          <strong className="text-foreground">A log of your SMS-tweets.</strong>{" "}
          We keep the posted body, the tweet ID, and the status (posted,
          failed, rate-limited). Used for abuse prevention and user support.
          Retained for 30 days then hashed.
        </li>
      </ul>

      <h2 className="!mt-12 text-2xl font-semibold text-foreground">
        What we do not store
      </h2>
      <ul className="space-y-3">
        <li>Your X password. Ever. OAuth only.</li>
        <li>Your location, contacts, or device identifiers.</li>
        <li>Analytics about who reads your tweets.</li>
        <li>Unverified phone numbers after 24 hours.</li>
      </ul>

      <h2 className="!mt-12 text-2xl font-semibold text-foreground">
        Where it lives
      </h2>
      <p>
        Data is stored in a Postgres instance in the EU region, encrypted at
        rest, behind row-level security. Secrets are kept in the host&apos;s
        encrypted environment. SMS transits a licensed global carrier under
        its standard encryption.
      </p>

      <h2 className="!mt-12 text-2xl font-semibold text-foreground">
        Your rights
      </h2>
      <p>
        You can revoke OffX at any time from{" "}
        <span className="text-foreground">/dashboard</span>. That deletes your
        row and revokes the X OAuth grant. You can also revoke directly from X
        under Settings → Apps &amp; sessions. If you prefer to email us, write
        to <span className="font-mono text-accent">privacy@offlinex.org</span>; we
        answer within 72 hours and delete within 7 days.
      </p>

      <h2 className="!mt-12 text-2xl font-semibold text-foreground">
        Changes to this policy
      </h2>
      <p>
        We will announce any material change in a tweet from{" "}
        <span className="font-mono">@OffXorg</span>, with a 14-day notice
        before it takes effect. If you disagree, revoke before the deadline.
      </p>
    </PageShell>
  );
}
