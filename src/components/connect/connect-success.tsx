import Link from "next/link";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function ConnectSuccess({ handle }: { handle: string }) {
  return (
    <div className="rounded-2xl border border-success/30 bg-success/5 p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20 text-success">
          <Check className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-semibold">
          @{handle} is live on OffX.
        </h2>
      </div>
      <p className="mt-4 text-muted-strong">
        Save our SMS number in your contacts as{" "}
        <span className="text-foreground">OffX</span> and start texting. Every
        message becomes a tweet.
      </p>
      <div className="mt-6">
        <LinkButton href="/dashboard" size="lg">
          Go to dashboard
        </LinkButton>
      </div>
      <p className="mt-3 text-xs text-muted">
        Need help? <Link href="/how-to" className="underline underline-offset-2 hover:text-foreground">Read the how-to</Link>.
      </p>
    </div>
  );
}
