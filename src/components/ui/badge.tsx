import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "success" | "muted" | "outline";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    default: "bg-surface-2 text-foreground border border-border",
    accent: "bg-accent/10 text-accent border border-accent/30",
    success: "bg-success/10 text-success border border-success/30",
    muted: "bg-surface text-muted border border-border",
    outline: "bg-transparent text-muted border border-border-strong",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
