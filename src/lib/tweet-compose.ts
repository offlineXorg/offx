const SUFFIX = "\n\nVia @OffXorg";
const ELLIPSIS = "...";
const MAX_TWEET = 280;

export function composeTweet(rawBody: string): string {
  const body = rawBody.trim().replace(/\s+/g, " ");
  const maxBody = MAX_TWEET - SUFFIX.length;
  if (body.length <= maxBody) return `${body}${SUFFIX}`;
  const trimmed = body.slice(0, maxBody - ELLIPSIS.length).trimEnd();
  return `${trimmed}${ELLIPSIS}${SUFFIX}`;
}

const BLOCKED_PATTERNS: RegExp[] = [
  /\bkill\s+(?:all|every)\s+\w+/i,
];

export function isBlockedContent(body: string): boolean {
  return BLOCKED_PATTERNS.some((rx) => rx.test(body));
}
