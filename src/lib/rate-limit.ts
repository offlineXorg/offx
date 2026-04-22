type Window = {
  hour: number[];
  day: number[];
};

const buckets = new Map<string, Window>();

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export const LIMITS = {
  perHour: 10,
  perDay: 50,
};

function prune(ts: number[], windowMs: number, now: number): number[] {
  const cutoff = now - windowMs;
  return ts.filter((t) => t >= cutoff);
}

export function check(phone: string): {
  ok: boolean;
  reason?: "hour" | "day";
  retryAfterMs?: number;
} {
  const now = Date.now();
  const existing = buckets.get(phone) ?? { hour: [], day: [] };
  const hour = prune(existing.hour, HOUR_MS, now);
  const day = prune(existing.day, DAY_MS, now);
  if (hour.length >= LIMITS.perHour) {
    return { ok: false, reason: "hour", retryAfterMs: hour[0] + HOUR_MS - now };
  }
  if (day.length >= LIMITS.perDay) {
    return { ok: false, reason: "day", retryAfterMs: day[0] + DAY_MS - now };
  }
  return { ok: true };
}

export function record(phone: string): void {
  const now = Date.now();
  const existing = buckets.get(phone) ?? { hour: [], day: [] };
  const hour = prune(existing.hour, HOUR_MS, now).concat(now);
  const day = prune(existing.day, DAY_MS, now).concat(now);
  buckets.set(phone, { hour, day });
}
