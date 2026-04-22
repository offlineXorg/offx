import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

type Status = "in-progress" | "upcoming";

const phases: Array<{
  phase: string;
  title: string;
  status: Status;
  items: string[];
}> = [
  {
    phase: "Phase 1",
    title: "Launch",
    status: "in-progress",
    items: [
      "Landing page + manifesto",
      "X OAuth 2.0 + phone verification",
      "SMS → tweet bridge",
      "Photos via MMS (up to 4 per message)",
      "Rate limiting & content safety",
    ],
  },
  {
    phase: "Phase 2",
    title: "Reach",
    status: "upcoming",
    items: [
      "Arabic · Farsi · Spanish · Ukrainian · French copy",
      "Country-specific SMS numbers",
      "Confirmation SMS in user's language",
      "Partnerships with press freedom orgs",
    ],
  },
  {
    phase: "Phase 3",
    title: "$OFFX token",
    status: "upcoming",
    items: [
      "Pump.fun-style fair launch on Solana",
      "Dev fees routed to on-chain treasury",
      "Public dashboard: revenue vs API spend",
      "Audit by a crypto governance group",
    ],
  },
  {
    phase: "Phase 4",
    title: "Deeper",
    status: "upcoming",
    items: [
      "Threads via multi-SMS stitching",
      "Receive mentions & DMs as SMS",
      "Satellite SMS experiments",
    ],
  },
];

const statusLabel: Record<Status, { label: string; variant: "accent" | "muted" }> = {
  "in-progress": { label: "In progress", variant: "accent" },
  upcoming: { label: "Upcoming", variant: "muted" },
};

export function Roadmap() {
  return (
    <section id="roadmap" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Roadmap
          </div>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Building in public.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Transparent phases, transparent funding. Every milestone is a PR you
            can read.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-4">
          {phases.map((p) => {
            const s = statusLabel[p.status];
            return (
              <div key={p.phase} className="flex flex-col gap-5 bg-background p-7">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-muted">{p.phase}</div>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </div>
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <ul className="space-y-2 text-sm text-muted-strong">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
