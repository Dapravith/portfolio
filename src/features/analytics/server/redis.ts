import 'server-only';
import { serverEnv } from '@/server/env';

/**
 * Runs one Upstash Redis REST command that returns an integer (SADD, SCARD).
 * Returns null when Redis is not configured or the call fails.
 */
export async function redisInteger(command: string[]): Promise<number | null> {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = serverEnv();
  if (!url || !token) return null;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.error || data.result == null) return null;
    const value = Number(data.result);
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  } catch {
    return null;
  }
}
