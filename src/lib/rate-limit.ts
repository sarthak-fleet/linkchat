const windows = new Map<string, number[]>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 20;

export function rateLimit(key: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = windows.get(key) ?? [];

  // Remove expired entries
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) {
    windows.set(key, valid);
    return { ok: false, remaining: 0 };
  }

  valid.push(now);
  windows.set(key, valid);

  // Cleanup old keys periodically
  if (windows.size > 10_000) {
    for (const [k, v] of windows) {
      if (v.every((t) => now - t >= WINDOW_MS)) windows.delete(k);
    }
  }

  return { ok: true, remaining: MAX_REQUESTS - valid.length };
}
