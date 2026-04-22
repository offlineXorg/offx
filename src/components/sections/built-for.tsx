import { Container } from "@/components/ui/container";
import { TARGET_COUNTRIES } from "@/lib/countries";

const statusMeta: Record<
  string,
  { label: string; className: string }
> = {
  live: {
    label: "Local number live",
    className:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  international: {
    label: "Reachable via intl SMS",
    className:
      "border-accent/30 bg-accent/10 text-accent",
  },
  blocked: {
    label: "Sanctions limit local numbers",
    className:
      "border-border bg-surface text-muted",
  },
};

export function BuiltFor() {
  return (
    <section id="built-for" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Built for
          </div>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Five countries where this matters most.
          </h2>
          <p className="mt-4 text-lg text-muted">
            These five have had X blocked, the internet cut, or both, in
            the last two years. Everyone else is welcome on the same bridge
            for free.
          </p>
        </div>

        <ul className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_COUNTRIES.map((c) => {
            const s = statusMeta[c.status];
            return (
              <li
                key={c.iso}
                className="flex flex-col gap-4 bg-background p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl leading-none" aria-hidden>
                    {c.flag}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {c.name}
                    </h3>
                    <div className="font-mono text-xs text-muted">
                      {c.dial}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {c.context}
                </p>
                <span
                  className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${s.className}`}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Local SMS gateways cost money, and some countries are off-limits
          to Western carriers. Until the <span className="text-foreground">$OFFX</span>{" "}
          treasury funds per-country numbers, everyone routes through our
          US long code. It works from any network that allows outbound
          international SMS.
        </p>
      </Container>
    </section>
  );
}
