'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALE_COOKIE, localizePath, stripLocale, type Locale } from '@/i18n/config';

type NavItem = { href: string; label: string };

/** Primary navigation with `aria-current` on the active section. */
export function SiteNav({ items, locale, label }: { items: NavItem[]; locale: Locale; label: string }) {
  const current = stripLocale(usePathname() ?? '/');
  return (
    <nav aria-label={label} className="col-span-2 -mx-2 md:col-span-1 md:mx-0">
      <ul className="flex flex-wrap items-center gap-x-1 text-small">
        {items.map((item) => {
          const active = current === item.href || current.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={localizePath(item.href, locale)}
                aria-current={active ? 'page' : undefined}
                className="inline-flex min-h-11 items-center px-2 text-muted underline-offset-[0.35em] hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Link to the same page in the other language; remembers the choice in a cookie. */
export function LanguageSwitch({
  locale,
  label,
  short,
  groupLabel,
}: {
  locale: Locale;
  label: string;
  short: string;
  groupLabel: string;
}) {
  const path = stripLocale(usePathname() ?? '/');
  const target: Locale = locale === 'en' ? 'km' : 'en';
  return (
    <Link
      href={localizePath(path, target)}
      hrefLang={target}
      lang={target}
      // A prefetch would run before the cookie changes and could cache a redirect.
      prefetch={false}
      title={`${groupLabel}: ${label}`}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      // System font for this one label: on English pages it is the only Khmer
      // text, and it should not pull a 40 KB web font onto the critical path.
      className="inline-flex min-h-11 items-center px-2 font-[system-ui,sans-serif] text-small text-muted hover:text-ink"
    >
      {short}
      {/* Accessible name starts with the visible text (WCAG 2.5.3). */}
      <span className="sr-only"> ({label})</span>
    </Link>
  );
}
