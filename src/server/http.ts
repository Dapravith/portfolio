import 'server-only';

export const NO_STORE = { 'Cache-Control': 'no-store' } as const;

/** JSON response that is never cached by the browser or CDN. */
export function jsonNoStore(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

/** Best-effort client identifier for rate limiting (first proxy hop on Vercel). */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}
