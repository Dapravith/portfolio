import { deliverContactMessage, getContactConfig, type ContactConfig } from './deliver';
import { createRateLimiter } from './rate-limit';
import { contactEnvelopeSchema, MIN_FILL_MS, type ContactField, type ContactResponse } from './schema';

const MAX_BODY_BYTES = 10_000;
const defaultLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

type Deps = {
  config?: ContactConfig | null;
  limiter?: ReturnType<typeof createRateLimiter>;
  fetchImpl?: typeof fetch;
};

function json(body: ContactResponse, status: number, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

function sameHost(origin: string, requestUrl: string): boolean {
  try {
    return new URL(origin).host === new URL(requestUrl).host;
  } catch {
    return false; // includes the opaque "null" origin
  }
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

/**
 * POST /api/contact. Returns `{ ok: true }` only after the email provider has
 * accepted the message. Message contents are never logged.
 */
export async function handleContact(request: Request, deps: Deps = {}): Promise<Response> {
  const config = deps.config === undefined ? getContactConfig() : deps.config;
  const limiter = deps.limiter ?? defaultLimiter;

  // Reject cross-site form posts. Same-origin fetches send a matching Origin.
  const origin = request.headers.get('origin');
  if (origin && !sameHost(origin, request.url)) {
    return json({ ok: false, error: 'bad_request' }, 403);
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: 'bad_request' }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'bad_request' }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const parsed = contactEnvelopeSchema.safeParse(payload);
  if (!parsed.success) {
    const fields = [
      ...new Set(
        parsed.error.issues
          .map((i) => i.path[0])
          .filter((p): p is ContactField => p === 'name' || p === 'email' || p === 'message'),
      ),
    ];
    // A filled honeypot or missing timing data is a bot signal, not a typo.
    if (fields.length === 0) return json({ ok: false, error: 'rejected' }, 400);
    return json({ ok: false, error: 'invalid', fields }, 422);
  }
  if (parsed.data.elapsedMs < MIN_FILL_MS) return json({ ok: false, error: 'rejected' }, 400);

  const rate = limiter(clientKey(request));
  if (!rate.allowed) {
    return json({ ok: false, error: 'rate_limited' }, 429, { 'Retry-After': String(rate.retryAfterSec) });
  }

  if (!config) return json({ ok: false, error: 'unavailable' }, 503);

  const { name, email, message } = parsed.data;
  const result = await deliverContactMessage({ name, email, message }, config, deps.fetchImpl);
  if (!result.ok) {
    console.error(`[contact] delivery failed (provider status ${result.status})`);
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }
  return json({ ok: true }, 200);
}
