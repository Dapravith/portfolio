import 'server-only';
import { randomUUID } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { redisInteger } from '@/features/analytics/server/redis';
import { serverEnv } from '@/server/env';
import { NO_STORE } from '@/server/http';

// A separate set starts the visitor count without the earlier test page views.
const VISITORS_KEY = 'portfolio:unique-browsers:v1';
const COOKIE_NAME = 'portfolio_visitor';
const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ROBOT_AGENT = /bot|crawler|spider|headless|lighthouse|preview|facebookexternalhit/i;

export type ViewsResponse = { success: true; data: { uniqueBrowsers: number } } | { success: false; error: string };

function responseForCount(uniqueBrowsers: number | null) {
  return uniqueBrowsers === null
    ? NextResponse.json<ViewsResponse>({ success: false, error: 'Visitor count unavailable' }, { status: 503, headers: NO_STORE })
    : NextResponse.json<ViewsResponse>({ success: true, data: { uniqueBrowsers } }, { headers: NO_STORE });
}

/** GET /api/analytics/views — current unique-browser count. */
export async function handleViewCount() {
  return responseForCount(await redisInteger(['SCARD', VISITORS_KEY]));
}

/**
 * POST /api/analytics/views — records this browser (anonymous random ID in an
 * httpOnly cookie) and returns the count. Only production traffic is recorded.
 */
export async function handleRecordView(request: NextRequest) {
  const env = serverEnv();
  // Local and preview traffic should never become production visitor statistics.
  const recordingEnabled = env.VERCEL_ENV === 'production' || env.PORTFOLIO_COUNT_VISITORS === 'true';
  if (!recordingEnabled || ROBOT_AGENT.test(request.headers.get('user-agent') ?? '')) return handleViewCount();

  const existing = request.cookies.get(COOKIE_NAME)?.value;
  const visitorId = existing && VISITOR_ID.test(existing) ? existing : randomUUID();
  const added = await redisInteger(['SADD', VISITORS_KEY, visitorId]);
  const count = added === null ? null : await redisInteger(['SCARD', VISITORS_KEY]);
  const response = responseForCount(count);
  // Keep the same anonymous ID even if storage is temporarily unavailable.
  if (!existing || !VISITOR_ID.test(existing)) {
    response.cookies.set(COOKIE_NAME, visitorId, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 2,
    });
  }
  return response;
}
