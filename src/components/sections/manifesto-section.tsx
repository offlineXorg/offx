import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";

export function ManifestoSection() {
  return (
    <section className="relative border-b border-border py-28">
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-30" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Why OffX exists
          </div>
          <blockquote className="mt-6 text-3xl font-medium leading-[1.15] tracking-tight sm:text-[2.75rem]">
            In 2025 governments turned the internet off{" "}
            <span className="text-accent">313 times</span>. We&apos;re building
            the fallback that doesn&apos;t rely on them.
          </blockquote>
          <p className="mt-10 text-lg leading-relaxed text-muted-strong">
            Twitter started on SMS. You sent a text to 40404, it appeared on
            the web. Then Twitter moved to the cloud and in 2020 retired the
            SMS gateway. Meanwhile governments figured out that the easiest
            way to end a protest is to turn off the pipes.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-strong">
            OffX rebuilds that bridge. If X is blocked where you live, if the
            tower is jammed, if you are underground, if you can&apos;t afford
            data, your voice should not have to wait for an ISP to agree with
            your government.
          </p>
          <div className="mt-8">
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              Read the full manifesto
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
