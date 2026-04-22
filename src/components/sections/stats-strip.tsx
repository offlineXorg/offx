import { Container } from "@/components/ui/container";

const stats = [
  { value: "313", label: "internet shutdowns in 2025" },
  { value: "52", label: "countries affected" },
  { value: "$19.7B", label: "in economic losses" },
  { value: "$0", label: "to use OffX right now" },
];

export function StatsStrip() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`relative px-4 ${i > 0 ? "sm:border-l sm:border-border" : ""}`}
          >
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs leading-snug text-muted sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
