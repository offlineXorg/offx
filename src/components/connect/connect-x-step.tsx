import { LinkButton } from "@/components/ui/link-button";
import { ArrowRight } from "lucide-react";

export function ConnectXStep() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <h2 className="text-2xl font-semibold">Connect your X account</h2>
      <p className="mt-3 text-muted">
        Sign in with X to let OffX post on your behalf when you SMS us.
      </p>
      <div className="mt-8">
        <LinkButton href="/api/auth/x/start" size="lg">
          Sign in with X
          <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </div>
  );
}
