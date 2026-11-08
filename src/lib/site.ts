import type { Metadata } from 'next';
import { defaultLocale, localizePath, locales, ogLocale, type Locale } from '@/i18n/config';
import type { Localized } from '@/content';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dapravith.vercel.app').replace(/\/$/, '');

/** Date the content was last checked against the résumé and repositories. */
export const contentReviewed = '2026-11-08';

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === '/' ? '/' : path}`;
}

/** Text for a locale plus whether it fell back to English. */
export function pick(value: Localized, locale: Locale): { text: string; fallback: boolean } {
  if (locale === 'km' && value.km) return { text: value.km, fallback: false };
  return { text: value.en, fallback: locale !== 'en' };
}

export function text(value: Localized, locale: Locale): string {
  return pick(value, locale).text;
}

const intlLocale: Record<Locale, string> = { en: 'en-GB', km: 'km-KH' };

/** `2024-10` → `Oct 2024` / `តុលា 2024`. */
export function formatMonth(yearMonth: string, locale: Locale): string {
  const [y, m] = yearMonth.split('-').map(Number);
  return new Intl.DateTimeFormat(intlLocale[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  );
}

export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

/** Canonical + hreflang alternates for a locale-independent path such as `/about`. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(localizePath(path, l));
  languages['x-default'] = absoluteUrl(localizePath(path, defaultLocale));
  const url = absoluteUrl(localizePath(path, locale));
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      ...(title ? { title } : {}),
      description,
      url,
      locale: ogLocale[locale],
      type: 'website',
      siteName: 'Rotha Dapravith',
    },
    twitter: { card: 'summary_large_image' },
  };
}
