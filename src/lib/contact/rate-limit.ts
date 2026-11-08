/**
 * Fixed-window rate limiter kept in process memory.
 *
 * Limitation (documented in docs/portfolio/OPERATIONS.md): on serverless
 * hosting every instance has its own memory, so this is a per-instance limit.
 * It stops a single client hammering a warm instance; the honeypot and timing
 * check handle most automated spam. Move to a shared store (e.g. Upstash
 * Redis) if abuse is observed.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()): { allowed: boolean; retryAfterSec: number } {
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, retryAfterSec: 0 };
    }
    entry.count += 1;
    if (entry.count > limit) {
      return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
    }
    return { allowed: true, retryAfterSec: 0 };
  };
}
