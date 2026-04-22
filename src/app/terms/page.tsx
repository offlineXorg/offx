import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Rules of use for OffX. Short and direct.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms of Service"
      title="Use OffX like it's a lifeline, because it is."
      lead="Last updated: April 2026. By connecting your X account you agree to the following."
    >
      <h2 className="text-2xl font-semibold text-foreground">1. What you can use OffX for</h2>
      <p>
        Posting tweets from your X account via SMS. That is it. Personal
        speech, journalism, activism, casual broadcasts, memes. All fine. OffX
        is free to use while the treasury can afford it.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        2. What you must not use OffX for
      </h2>
      <ul className="space-y-3">
        <li>
          Content that violates{" "}
          <a
            href="https://help.x.com/en/rules-and-policies/x-rules"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-accent"
          >
            X&apos;s rules
          </a>
          : violent threats, targeted harassment, CSAM, doxxing, terrorism
          glorification.
        </li>
        <li>
          Illegal activity under the law of the country you&apos;re texting
          from.
        </li>
        <li>
          Commercial spam, affiliate dumping, pump-and-dump schemes, impersonation
          campaigns, or automated bot floods.
        </li>
        <li>
          Circumventing a lawful suspension of your X account.
        </li>
      </ul>
      <p>
        We apply automated content checks and may block, delay, or ban an
        account without notice. Appeals go to{" "}
        <span className="font-mono text-accent">appeals@offlinex.org</span>.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        3. Rate limits
      </h2>
      <p>
        10 tweets per hour, 50 per day, per phone number. These limits exist to
        protect X&apos;s API budget, the OffX treasury, and you from a compromised
        SIM.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        4. Attribution
      </h2>
      <p>
        Every tweet posted through OffX includes the suffix{" "}
        <span className="font-mono">Via @OffXorg</span>. You cannot remove it.
        It&apos;s part of keeping readers informed and keeping us accountable.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        5. No warranty
      </h2>
      <p>
        OffX is provided on a best-effort basis by a non-profit. We cannot
        guarantee delivery during total network shutdowns, Twilio outages, X API
        suspensions, or carrier-level SMS blocks. Do not rely on OffX as your
        sole channel in life-threatening situations.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        6. Liability
      </h2>
      <p>
        You are the sole author of anything you post through OffX. We are a
        conduit, not a publisher. You indemnify OffX against claims arising
        from content you choose to send.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        7. Governing law
      </h2>
      <p>
        These terms are governed by the laws of France. Disputes are resolved by
        the courts of Paris, without prejudice to consumer protections in your
        country of residence.
      </p>

      <h2 className="!mt-10 text-2xl font-semibold text-foreground">
        8. Changes
      </h2>
      <p>
        Any material change is announced on{" "}
        <span className="font-mono">@OffXorg</span> with 14 days&apos; notice. If
        you disagree, revoke access from your dashboard before the deadline.
      </p>
    </PageShell>
  );
}
