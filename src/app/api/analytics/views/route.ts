import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

// A separate set starts the visitor count without the earlier test page views.
const VISITORS_KEY = "portfolio:unique-browsers:v1";
const COOKIE_NAME = "portfolio_visitor";
const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ROBOT_AGENT = /bot|crawler|spider|headless|lighthouse|preview|facebookexternalhit/i;
const NO_CACHE = { "Cache-Control": "no-store" };

async function redisCommand(command: string[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      cache: "no-store",
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

function responseForCount(uniqueBrowsers: number | null) {
  return uniqueBrowsers === null
    ? NextResponse.json({ success: false, error: "Visitor count unavailable" }, { status: 503, headers: NO_CACHE })
    : NextResponse.json({ success: true, data: { uniqueBrowsers } }, { headers: NO_CACHE });
}

export async function GET() {
  return responseForCount(await redisCommand(["SCARD", VISITORS_KEY]));
}

export async function POST(request: NextRequest) {
  // Local and preview traffic should never become production visitor statistics.
  const recordingEnabled = process.env.VERCEL_ENV === "production" || process.env.PORTFOLIO_COUNT_VISITORS === "true";
  if (!recordingEnabled || ROBOT_AGENT.test(request.headers.get("user-agent") ?? "")) return GET();

  const existing = request.cookies.get(COOKIE_NAME)?.value;
  const visitorId = existing && VISITOR_ID.test(existing) ? existing : randomUUID();
  const added = await redisCommand(["SADD", VISITORS_KEY, visitorId]);
  const count = added === null ? null : await redisCommand(["SCARD", VISITORS_KEY]);
  const response = responseForCount(count);
  // Keep the same anonymous ID even if storage is temporarily unavailable.
  if (!existing || !VISITOR_ID.test(existing)) {
    response.cookies.set(COOKIE_NAME, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 2,
    });
  }
  return response;
}
