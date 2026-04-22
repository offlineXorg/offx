import { cn } from "@/lib/utils";

export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const height = size;
  const width = Math.round(size * (400 / 290));
  return (
    <img
      src="/brand/offx-mark.svg"
      alt="OffX"
      width={width}
      height={height}
      className={cn("inline-block select-none", className)}
    />
  );
}

export function Logo({
  className,
  showWord = true,
  markSize = 28,
}: {
  className?: string;
  showWord?: boolean;
  markSize?: number;
}) {
  if (!showWord) {
    return <LogoMark size={markSize} className={className} />;
  }
  const height = markSize;
  const width = Math.round(height * (1050 / 290));
  return (
    <img
      src="/brand/offx-logo.svg"
      alt="OffX"
      width={width}
      height={height}
      className={cn("inline-block select-none", className)}
    />
  );
}
