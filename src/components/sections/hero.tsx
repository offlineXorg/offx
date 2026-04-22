import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BarChart2,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Radio,
  Repeat2,
  Share,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.18),transparent_60%)]" />
      <Container className="relative grid items-center gap-14 pb-24 pt-20 md:pt-28 lg:grid-cols-[1.08fr_1fr]">
        <div>
          <Badge variant="accent" className="mb-6">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            New · Attach photos to your SMS, they tweet too
          </Badge>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Tweet without
            <br />
            <span className="text-accent">internet.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-strong">
            OffX turns SMS into tweets, photos included. You text our number,
            we post it on your X account. Works when the app is blocked, when
            data is down, when the only thing left on your phone is a signal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="/connect" size="lg">
              Connect your X
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/manifesto" size="lg" variant="secondary">
              Read the manifesto
            </LinkButton>
          </div>
          <p className="mt-5 text-sm text-muted">
            No app to install · No KYC · Open source
          </p>
        </div>
        <HeroMockup />
      </Container>
    </section>
  );
}

function TweetAction({
  Icon,
  count,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  count: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="h-[15px] w-[15px]" />
      <span>{count}</span>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.14),transparent_70%)]" />

      <div className="relative rounded-[32px] border border-border bg-surface p-4 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" />
            SMS Mode · No data
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Radio className="h-3.5 w-3.5" />
            GSM
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-accent-foreground">
              Helicopters overhead in Mashhad. Reporting for my followers before
              this battery dies.
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 text-[11px] text-muted">
            <span>To OffX · +1 415 ···</span>
            <span>· Delivered</span>
          </div>
        </div>

        <div className="my-5 flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted">
          <div className="h-px flex-1 bg-border" />
          <span>Posted via GSM</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="rounded-2xl border border-border bg-surface-2 p-4">
          <div className="flex items-start gap-3">
            <Image
              src="/avatars/sara.jpg"
              alt="Sara profile photo"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
              priority
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1 text-sm">
                  <span className="truncate font-semibold text-foreground">
                    Sara
                  </span>
                  <BadgeCheck className="h-4 w-4 shrink-0 fill-[#1d9bf0] text-background" />
                  <span className="truncate text-muted">@sara_m</span>
                  <span className="text-muted">·</span>
                  <span className="text-muted">1m</span>
                </div>
                <MoreHorizontal className="h-4 w-4 shrink-0 text-muted" />
              </div>
              <div className="mt-1 text-[15px] leading-snug text-foreground">
                <p>
                  Helicopters overhead in Mashhad. Reporting for my followers
                  before this battery dies.
                </p>
                <div className="mt-3 grid h-36 grid-cols-2 gap-[2px] overflow-hidden rounded-2xl">
                  <Image
                    src="/brand/mock/photo-1.jpg"
                    alt=""
                    width={280}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                  <Image
                    src="/brand/mock/photo-2-v2.jpg"
                    alt=""
                    width={280}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-muted">Via @OffXorg</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <TweetAction Icon={MessageCircle} count="38" />
                <TweetAction Icon={Repeat2} count="142" />
                <TweetAction Icon={Heart} count="1.2k" />
                <TweetAction Icon={BarChart2} count="24k" />
                <div className="flex items-center gap-3">
                  <Bookmark className="h-[15px] w-[15px]" />
                  <Share className="h-[15px] w-[15px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
