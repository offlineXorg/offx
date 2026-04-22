import { cn } from "@/lib/utils";

export function LogoMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M 5 32 A 19 19 0 0 1 43 32"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M 11 32 A 13 13 0 0 1 37 32"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 16 32 A 8 8 0 0 1 32 32"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      <path
        d="M 12 22 h 7 q 3 0 3 3 v 7 q 0 3 -3 3 h -4 l -4 4 l 1 -4 q -3 0 -3 -3 v -7 q 0 -3 3 -3 z"
        fill="var(--background)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <circle cx="12.5" cy="28.5" r="1.3" fill="currentColor" />
      <circle cx="15.5" cy="28.5" r="1.3" fill="currentColor" />
      <circle cx="18.5" cy="28.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className,
  showWord = true,
  markSize = 22,
}: {
  className?: string;
  showWord?: boolean;
  markSize?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
      aria-label="OffX"
    >
      <LogoMark size={markSize} className="text-accent" />
      {showWord ? (
        <span>
          Off<span className="text-accent">X</span>
        </span>
      ) : null}
    </span>
  );
}
