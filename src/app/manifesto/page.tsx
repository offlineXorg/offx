import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/link-button";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Why OffX exists: the internet gets turned off, voices should not.",
};

export default function ManifestoPage() {
  return (
    <PageShell
      eyebrow="Manifesto"
      title="The internet gets turned off. Your voice shouldn't."
      lead="A short statement of what we believe and what we refuse."
    >
      <p>
        In 2025 the internet was deliberately switched off{" "}
        <a
          href="https://www.accessnow.org/keepiton/"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-2 hover:text-accent"
        >
          313 times
        </a>
        , across 52 countries, with a combined economic cost of $19.7 billion.
        Most of those shutdowns landed on protests, elections, and moments of
        political crisis. That is not a coincidence.
      </p>

      <p>
        Twitter was born on SMS. The 140-character limit came from the 160-byte
        envelope of an SMS packet. You sent a text to{" "}
        <span className="font-mono text-foreground">40404</span>, it appeared on
        the web. Then Twitter climbed to the cloud, got data-hungry, and retired
        the SMS gateway in 2020. The phone got left behind.
      </p>

      <p>
        OffX rebuilds that bridge. We are not replacing X and not forking it.
        We just make sure the phone you already hold can still post to it when
        the rest of the stack breaks.
      </p>

      <h2 className="!mt-14 text-2xl font-semibold text-foreground">
        What we believe
      </h2>

      <ul className="space-y-3">
        <li>
          If a journalist can&apos;t publish, atrocities become rumors. If a
          citizen can&apos;t report, a protest becomes a crime. Expression is
          infrastructure, not a nice-to-have.
        </li>
        <li>
          Every piece of our stack should fall back to the oldest working
          layer: first the internet, then SMS, eventually satellite. Features
          come after.
        </li>
        <li>
          Every OffX tweet ends with{" "}
          <span className="font-mono">Via @OffXorg</span>. Readers should know
          the channel. We are not hiding.
        </li>
        <li>
          We store the minimum we need to run the service: your phone number,
          your X OAuth tokens, a short log of posts we made for you. We do not
          sell, share, or analyze your messages.
        </li>
      </ul>

      <h2 className="!mt-14 text-2xl font-semibold text-foreground">
        What we refuse
      </h2>

      <ul className="space-y-3">
        <li>
          No sponsored tweets, not now, not ever. Paid content turns this into
          an ad channel and it stops being useful.
        </li>
        <li>
          No closed source. The webhook handler, the content filter, the rate
          limits are all public. The code is there, read it.
        </li>
        <li>
          No vague promises. We cannot guarantee SMS survives every shutdown.
          Iran cut SMS too during the January 2026 blackout. We will say this
          out loud before anyone is disappointed.
        </li>
      </ul>

      <h2 className="!mt-14 text-2xl font-semibold text-foreground">
        How we stay alive
      </h2>

      <p>
        OffX is a non-profit. Funding comes from developer fees on a Solana
        token,{" "}
        <span className="font-mono text-accent">$OFFX</span>. Every swap of the
        token routes a fraction to our on-chain treasury, which pays the SMS
        bill, the X API bill, the domain, and the server. When the treasury
        runs out, OffX shuts down. We will tell you before it does.
      </p>

      <p>
        No venture money. No data for sale. No business model waiting at the
        end of the tunnel.
      </p>

      <div className="mt-14 flex flex-wrap items-center gap-3">
        <LinkButton href="/connect" size="lg">
          Connect your X
        </LinkButton>
        <LinkButton href="/how-to" size="lg" variant="secondary">
          How it works
        </LinkButton>
      </div>
    </PageShell>
  );
}
