import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function rateLimiter(
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
) {
  return (request: NextRequest) => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const userLimit = rateLimit.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
      return null;
    }

    if (userLimit.count >= limit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    userLimit.count++;
    return null;
  };
}

export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options?: { limit?: number; windowMs?: number }
) {
  const limiter = rateLimiter(options?.limit, options?.windowMs);

  return async (request: NextRequest) => {
    const rateLimitResponse = limiter(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    return handler(request);
  };
}
