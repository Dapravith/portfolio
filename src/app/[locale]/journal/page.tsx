import type { Metadata } from 'next';
import { JournalList } from '@/components/journal-list';
import { PageHeader } from '@/components/section';
import { content } from '@/content';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { pageMetadata } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: '/journal', title: t.journal.title, description: t.journal.intro });
}

export default async function JournalPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  return (
    <>
      <PageHeader title={t.journal.title}>
        <p>{t.journal.intro}</p>
      </PageHeader>
      <div className="border-t border-rule py-section">
        <div className="page md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div aria-hidden className="hidden md:block" />
          <div className="min-w-0">
            <JournalList entries={content.journal} locale={locale} t={t} headingLevel="h2" />
          </div>
        </div>
      </div>
    </>
  );
}
