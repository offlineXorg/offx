import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Logo } from "@/components/brand/logo";

const nav = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/how-to", label: "How to" },
  { href: "/#roadmap", label: "Roadmap" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="text-base text-foreground hover:text-accent transition-colors"
        >
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/connect" variant="primary" size="sm">
            Connect
          </LinkButton>
        </div>
      </Container>
    </header>
  );
}
