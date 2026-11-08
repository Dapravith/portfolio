export const locales = ['en', 'km'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Cookie that remembers an explicit language choice. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * Public URL path for a locale. English lives at the root (`/about`),
 * Khmer under a prefix (`/km/about`).
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Removes a leading locale segment: `/km/about` → `/about`. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|km)(?=\/|$)/);
  if (!match) return pathname || '/';
  const rest = pathname.slice(match[0].length);
  return rest === '' ? '/' : rest;
}

export const htmlLang: Record<Locale, string> = { en: 'en', km: 'km' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', km: 'km_KH' };
