import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ContactConfig } from '@/lib/contact/deliver';
import { handleContact } from '@/lib/contact/handler';
import { createRateLimiter } from '@/lib/contact/rate-limit';

const config: ContactConfig = { apiKey: 'test-key', to: 'inbox@example.com', from: 'Site <site@example.com>', endpoint: 'https://mail.test/emails' };
const valid = { name: 'Sok Dara', email: 'dara@example.com', message: 'Hello, I would like to talk about a role.', website: '', elapsedMs: 8000 };

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://dapravith.vercel.app/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://dapravith.vercel.app', 'x-forwarded-for': '203.0.113.7', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

const freshLimiter = () => createRateLimiter({ limit: 5, windowMs: 60_000 });
const okFetch = () => vi.fn(async () => Response.json({ id: 'email_123' }));

afterEach(() => vi.restoreAllMocks());

describe('POST /api/contact', () => {
  it('reports success only after the provider accepts, with reply-to set to the visitor', async () => {
    const fetchImpl = okFetch();
    const res = await handleContact(request(valid), { config, limiter: freshLimiter(), fetchImpl });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(config.endpoint);
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-key');
    const sent = JSON.parse(String(init.body));
    expect(sent).toMatchObject({ to: ['inbox@example.com'], reply_to: 'dara@example.com' });
    expect(sent.text).toContain(valid.message);
  });

  it('returns 502 and never claims success when the provider fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => new Response('nope', { status: 500 }));
    const res = await handleContact(request(valid), { config, limiter: freshLimiter(), fetchImpl });
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: 'delivery_failed' });
    // The log line must not contain personal data.
    const logged = error.mock.calls.flat().join(' ');
    expect(logged).not.toContain(valid.email);
    expect(logged).not.toContain(valid.message);
  });

  it('treats a network error as a delivery failure', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('fetch failed');
    });
    const res = await handleContact(request(valid), { config, limiter: freshLimiter(), fetchImpl });
    expect(res.status).toBe(502);
  });

  it('returns 503 when no provider is configured', async () => {
    const res = await handleContact(request(valid), { config: null, limiter: freshLimiter() });
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: 'unavailable' });
  });

  it('names the invalid fields', async () => {
    const res = await handleContact(request({ ...valid, email: 'not-an-email', message: 'short' }), { config, limiter: freshLimiter() });
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ ok: false, error: 'invalid', fields: ['email', 'message'] });
  });

  it('rejects control characters in the name (subject-line injection)', async () => {
    const res = await handleContact(request({ ...valid, name: 'Bob\r\nBcc: x@y.z' }), { config, limiter: freshLimiter() });
    expect(res.status).toBe(422);
  });

  it('rejects a filled honeypot and implausibly fast submissions without sending', async () => {
    const fetchImpl = okFetch();
    const honeypot = await handleContact(request({ ...valid, website: 'http://spam' }), { config, limiter: freshLimiter(), fetchImpl });
    const fast = await handleContact(request({ ...valid, elapsedMs: 300 }), { config, limiter: freshLimiter(), fetchImpl });
    expect(honeypot.status).toBe(400);
    expect(fast.status).toBe(400);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('rate-limits repeated submissions from one client', async () => {
    const limiter = freshLimiter();
    const fetchImpl = okFetch();
    for (let i = 0; i < 5; i++) expect((await handleContact(request(valid), { config, limiter, fetchImpl })).status).toBe(200);
    const blocked = await handleContact(request(valid), { config, limiter, fetchImpl });
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get('retry-after'))).toBeGreaterThan(0);
    const other = await handleContact(request(valid, { 'x-forwarded-for': '198.51.100.2' }), { config, limiter, fetchImpl });
    expect(other.status).toBe(200);
  });

  it('rejects cross-site posts, wrong content types, malformed and oversized bodies', async () => {
    const deps = { config, limiter: freshLimiter() };
    expect((await handleContact(request(valid, { origin: 'https://evil.example' }), deps)).status).toBe(403);
    expect((await handleContact(request(valid, { origin: 'null' }), deps)).status).toBe(403);
    expect((await handleContact(request(valid, { 'content-type': 'text/plain' }), deps)).status).toBe(415);
    expect((await handleContact(request('{not json'), deps)).status).toBe(400);
    expect((await handleContact(request({ ...valid, message: 'x'.repeat(20_000) }), deps)).status).toBe(413);
  });

  it('never caches responses', async () => {
    const res = await handleContact(request(valid), { config: null, limiter: freshLimiter() });
    expect(res.headers.get('cache-control')).toBe('no-store');
  });
});
