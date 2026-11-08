import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { proxy } from '@/proxy';

const req = (path: string, cookie?: string) =>
  new NextRequest(`https://dapravith.vercel.app${path}`, { headers: cookie ? { cookie } : {} });

describe('locale proxy', () => {
  it('rewrites unprefixed paths to the English segment', () => {
    const res = proxy(req('/about'));
    expect(res.headers.get('x-middleware-rewrite')).toBe('https://dapravith.vercel.app/en/about');
  });

  it('keeps query strings on rewrite', () => {
    const res = proxy(req('/projects?category=security'));
    expect(res.headers.get('x-middleware-rewrite')).toBe('https://dapravith.vercel.app/en/projects?category=security');
  });

  it('passes Khmer paths through untouched', () => {
    const res = proxy(req('/km/about'));
    expect(res.headers.get('x-middleware-rewrite')).toBeNull();
    expect(res.headers.get('location')).toBeNull();
  });

  it('redirects duplicate /en URLs to the canonical root URLs', () => {
    expect(proxy(req('/en')).headers.get('location')).toBe('https://dapravith.vercel.app/');
    const res = proxy(req('/en/projects'));
    expect(res.status).toBe(308);
    expect(res.headers.get('location')).toBe('https://dapravith.vercel.app/projects');
  });

  it('sends visitors who chose Khmer to the Khmer URL (temporary redirect)', () => {
    const res = proxy(req('/contact', 'NEXT_LOCALE=km'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://dapravith.vercel.app/km/contact');
    expect(proxy(req('/', 'NEXT_LOCALE=km')).headers.get('location')).toBe('https://dapravith.vercel.app/km');
  });

  it('does not treat paths that merely start with "km" as Khmer', () => {
    expect(proxy(req('/kmz')).headers.get('x-middleware-rewrite')).toBe('https://dapravith.vercel.app/en/kmz');
  });
});
