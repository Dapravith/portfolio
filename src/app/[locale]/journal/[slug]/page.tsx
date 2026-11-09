import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JournalList } from '@/components/journal-list';
import { T } from '@/components/localized-text';
import { content, getJournalEntry } from '@/content';
import { isLocale, localizePath, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { articleJsonLd } from '@/lib/json-ld';
import { formatDate, pageMetadata, text } from '@/lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => content.journal.map((j) => ({ locale, slug: j.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getJournalEntry(slug);
  if (!isLocale(locale) || !entry) return {};
  const meta = pageMetadata({
    locale,
    path: `/journal/${slug}`,
    title: text(entry.title, locale),
    description: text(entry.summary, locale),
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: entry.published } };
}

export default async function JournalArticlePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();
  const t = getDictionary(locale);
  // Compiled at build time by @next/mdx; slugs are fixed by generateStaticParams.
  const { default: Article } = await import(`@/content/journal/${slug}.mdx`);
  const others = content.journal.filter((j) => j.slug !== slug).slice(0, 2);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(entry, locale)) }} />

      <header className="page pt-10 pb-12 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 md:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label={t.a11y.breadcrumb} className="mb-4 md:mb-0 md:pt-3">
          <Link href={localizePath('/journal', locale)} className="link label">
            ← {t.journal.back}
          </Link>
        </nav>
        <div className="min-w-0">
          <p className="label">
            {t.journal.kinds[entry.kind]} · {t.journal.readingTime(entry.readingMinutes)}
          </p>
          <h1 className="mt-3 max-w-[44rem] font-serif text-display font-semibold tracking-[-0.02em]">
            <T value={entry.title} locale={locale} />
          </h1>
          <T as="p" value={entry.summary} locale={locale} className="mt-5 max-w-[42rem] text-lead text-muted" />
          <p className="mt-6 font-mono text-meta text-muted">
            {t.journal.published} <time dateTime={entry.published}>{formatDate(entry.published, locale)}</time>
            {' · '}
            {entry.tags.join(' · ')}
          </p>
        </div>
      </header>

      <div className="border-t border-rule py-section">
        <div className="page md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div aria-hidden className="hidden md:block" />
          <div className="min-w-0 max-w-[44rem]">
            {locale !== 'en' && t.journal.englishOnly && (
              <p className="mb-10 border-l-2 border-accent pl-4 text-small text-muted">{t.journal.englishOnly}</p>
            )}
            <div lang="en" className="article">
              <Article />
            </div>

            {others.length > 0 && (
              <section aria-labelledby="more-title" className="mt-16">
                <h2 id="more-title" className="label mb-4">
                  {t.journal.more}
                </h2>
                <JournalList entries={others} locale={locale} t={t} />
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
