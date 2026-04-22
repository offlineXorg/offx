import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";

const groups = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: "/how-to", label: "How to" },
      { href: "/connect", label: "Connect" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Mission",
    links: [
      { href: "/manifesto", label: "Manifesto" },
      { href: "/#roadmap", label: "Roadmap" },
      { href: "https://github.com", label: "GitHub", external: true },
    ],
  },
  {
    title: "Allies",
    links: [
      { href: "https://www.accessnow.org/keepiton/", label: "Access Now #KeepItOn", external: true },
      { href: "https://freedomhouse.org/", label: "Freedom House", external: true },
      { href: "https://rsf.org/", label: "Reporters Without Borders", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="text-lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A non-profit bridge that turns an SMS into a tweet, so no shutdown
              can silence you.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" />
              <span>Network online · SMS fallback ready</span>
            </div>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-medium uppercase tracking-widest text-muted">
                {g.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {g.links.map((l) =>
                  "external" in l && l.external ? (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-strong transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-muted-strong transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} OffX · Open source · Not affiliated with X Corp.</p>
          <p>
            Stats sourced from{" "}
            <a
              href="https://www.accessnow.org/keepiton/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Access Now #KeepItOn 2025 report
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
