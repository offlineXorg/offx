import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function PageShell({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border py-20 md:py-24">
          <Container>
            {eyebrow ? (
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {title}
            </h1>
            {lead ? (
              <p className="mt-5 max-w-2xl text-lg text-muted">{lead}</p>
            ) : null}
          </Container>
        </section>
        <section className="py-20">
          <Container className={cn("max-w-3xl", className)}>
            <div className="prose-offx space-y-6 text-base leading-relaxed text-muted-strong">
              {children}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
