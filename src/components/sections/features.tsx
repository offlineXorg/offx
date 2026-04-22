import {
  Radio,
  Timer,
  ShieldCheck,
  Globe,
  Eye,
  GitBranch,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: Radio,
    title: "Works without data",
    body: "Plain GSM over your carrier's SMS channel. No Wi-Fi, no 4G, no VPN, no roaming. If a text message can leave your phone, your tweet lands.",
  },
  {
    icon: Timer,
    title: "60-second setup",
    body: "OAuth with X, verify your phone number with a one-time code, save our number in your contacts. You never install an app.",
  },
  {
    icon: Globe,
    title: "Platform-proof",
    body: "If X is blocked where you are, your SMS still tweets. Offline, underground, rural, mid-blackout: the post goes through.",
  },
  {
    icon: ShieldCheck,
    title: "Non-profit & self-funded",
    body: "We run on dev fees from the $OFFX token, not on your data. No ads, no tracking, no resale. Treasury is on-chain and public.",
  },
  {
    icon: Eye,
    title: "Transparent attribution",
    body: "Every SMS-posted tweet ends with `Via @OffXorg` so your followers know how it reached them. No ghostwriting, no disguise.",
  },
  {
    icon: GitBranch,
    title: "Open source",
    body: "Full codebase on GitHub. Audit the webhook, the rate limits, the token handling. Everything that moves is in public.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            What OffX is
          </div>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            What makes OffX work.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Six things we won&apos;t cut corners on.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group flex flex-col gap-4 bg-background p-7 transition-colors hover:bg-surface"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent transition-colors group-hover:border-accent/40">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
