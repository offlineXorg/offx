import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15),transparent_65%)]" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Ready to tweet
          <br />
          without internet?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
          Takes 60 seconds. Open source the whole way.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/connect" size="lg">
            Connect your X
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href="/how-to" size="lg" variant="secondary">
            How it works
          </LinkButton>
        </div>
        <p className="mt-5 text-sm text-muted">
          No app to install · Available wherever your SMS works
        </p>
      </Container>
    </section>
  );
}
