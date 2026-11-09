import Link from 'next/link';
import type { JournalEntry } from '@/content';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { formatDate } from '@/lib/site';
import { T } from './localized-text';

/** Journal entries as dated rows: date and kind in the margin, title and summary beside. */
export function JournalList({
  entries,
  locale,
  t,
  headingLevel = 'h3',
}: {
  entries: JournalEntry[];
  locale: Locale;
  t: Dictionary;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <ol className="border-b border-rule">
      {entries.map((entry) => (
        <li key={entry.slug} className="grid gap-1 border-t border-rule py-6 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-x-8">
          <p className="font-mono text-meta text-muted sm:pt-1.5">
            <time dateTime={entry.published}>{formatDate(entry.published, locale)}</time>
            <span className="block">{t.journal.kinds[entry.kind]}</span>
          </p>
          <div className="min-w-0">
            <Heading className="font-serif text-h3 font-semibold">
              <Link href={localizePath(`/journal/${entry.slug}`, locale)} className="hover:text-accent">
                <T value={entry.title} locale={locale} />
              </Link>
            </Heading>
            <T as="p" value={entry.summary} locale={locale} className="mt-2 max-w-prose text-muted" />
            <p className="tags mt-3">
              <span>{t.journal.readingTime(entry.readingMinutes)}</span>
              {entry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
