import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE } from '@/i18n/config';

/**
 * URL scheme: English at the root (`/about`), Khmer under `/km` (`/km/about`).
 * - `/en/...` is a duplicate of the root and is redirected to it.
 * - Unprefixed paths are rewritten to `/en/...` internally.
 * - A visitor who explicitly chose Khmer (cookie) is sent to the Khmer URL.
 *   Crawlers never carry the cookie, so they always see the canonical URLs.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/km' || pathname.startsWith('/km/')) {
    return NextResponse.next();
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (request.cookies.get(LOCALE_COOKIE)?.value === 'km') {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/km' : `/km${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any path with a file extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
