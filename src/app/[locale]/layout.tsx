import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Kantumruy_Pro, Source_Serif_4 } from 'next/font/google';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import { ExternalLink } from '@/components/external-link';
import { ChatAssistant } from '@/components/chat-assistant';
import { PhnomPenhTime } from '@/components/phnom-penh-time';
import { ViewCounter } from '@/components/ViewCounter';
import { LanguageSwitch, SiteNav } from '@/components/site-nav';
import { ThemeScript, ThemeToggle } from '@/components/theme-toggle';
import { content } from '@/content';
import { htmlLang, isLocale, localizePath, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { absoluteUrl, contentReviewed, formatDate, pageMetadata, siteUrl } from '@/lib/site';

// display: 'optional' — if a font is not ready within ~100 ms the size-adjusted
// fallback is kept for that page view instead of swapping late. Measured: home
// LCP median 2.6 s → 2.2 s (Lighthouse mobile, see
// docs/portfolio/TEST_PLAN.md).
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'optional',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'optional',
  preload: false,
  // The generated metric-adjusted fallback is a proportional face; without it
  // the stack falls through to ui-monospace, so labels and code blocks stay
  // monospaced on a first visit when Plex Mono is not used.
  adjustFontFallback: false,
});
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-source-serif',
  display: 'optional',
});
// Only downloaded when Khmer glyphs are on the page. display: 'swap', not
// 'optional': many systems have no Khmer font, and a missed 'optional' window
// would leave the page in a fallback that cannot shape Khmer at all.
const kantumruy = Kantumruy_Pro({
  subsets: ['khmer'],
  weight: ['400', '500', '600'],
  variable: '--font-kantumruy',
  display: 'swap',
  preload: false,
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1221' },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.siteTitle, template: '%s — Rotha Dapravith' },
    authors: [{ name: content.profile.name, url: siteUrl }],
    creator: content.profile.name,
    ...pageMetadata({ locale, path: '/', description: t.meta.description }),
    openGraph: {
      ...pageMetadata({ locale, path: '/', description: t.meta.description }).openGraph,
      title: t.meta.siteTitle,
      images: [{ url: absoluteUrl('/api/og'), width: 1200, height: 630, alt: t.meta.siteTitle }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const { profile } = content;

  const nav = [
    { href: '/projects', label: t.nav.work },
    { href: '/journal', label: t.nav.journal },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <html
      lang={htmlLang[locale]}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} ${sourceSerif.variable} ${kantumruy.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      {/* Browser extensions may add attributes to body before React hydrates. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          {t.a11y.skip}
        </a>

        <header className="border-b border-rule">
          <div className="page grid grid-cols-[1fr_auto] items-center gap-x-4 py-2 md:grid-cols-[auto_1fr_auto] md:gap-x-10">
            <Link
              href={localizePath('/', locale)}
              className="inline-flex min-h-11 items-center font-serif text-[1.1875rem] font-semibold tracking-[-0.01em] whitespace-nowrap"
            >
              {profile.name}
            </Link>
            <div className="flex items-center justify-end md:order-last">
              <LanguageSwitch
                locale={locale}
                label={t.a11y.switchTo}
                short={t.a11y.switchToShort}
                groupLabel={t.a11y.language}
              />
              <ThemeToggle toLight={t.a11y.themeToLight} toDark={t.a11y.themeToDark} />
            </div>
            <SiteNav items={nav} locale={locale} label={t.nav.label} />
          </div>
        </header>

        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>

        <footer className="border-t border-rule">
          <div className="page grid gap-6 py-10 text-small text-muted md:grid-cols-[1fr_auto] md:items-end">
            <div className="space-y-1">
              <p className="font-serif text-base font-semibold text-ink">{profile.name}</p>
              <p>
                <a className="link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <p>
                Telegram{' '}
                <ExternalLink
                  href={`https://t.me/${profile.telegram.username}`}
                  newTabLabel={t.a11y.opensNewTab}
                  icon={false}
                >
                  @{profile.telegram.username}
                </ExternalLink>
                {' · '}
                <a className="link whitespace-nowrap" href={`tel:${profile.telegram.phone}`}>
                  {profile.telegram.phoneDisplay}
                </a>
              </p>
              <p><PhnomPenhTime locale={locale} /> · <ViewCounter locale={locale} /></p>
              <p>
                {t.footer.built} {formatDate(contentReviewed, locale)}.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <ExternalLink href={profile.links.github} newTabLabel={t.a11y.opensNewTab}>
                  GitHub
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={profile.links.linkedin} newTabLabel={t.a11y.opensNewTab}>
                  LinkedIn
                </ExternalLink>
              </li>
              <li><ExternalLink href="https://www.facebook.com/VithRMG" newTabLabel={t.a11y.opensNewTab}>Facebook</ExternalLink></li>
              <li><ExternalLink href="https://www.instagram.com/rotha_dapravith_18/" newTabLabel={t.a11y.opensNewTab}>Instagram</ExternalLink></li>
              <li>
                <ExternalLink href="https://github.com/Dapravith/portfolio" newTabLabel={t.a11y.opensNewTab}>
                  {t.footer.source}
                </ExternalLink>
              </li>
            </ul>
          </div>
        </footer>
        <ChatAssistant locale={locale} />
      </body>
    </html>
  );
}
