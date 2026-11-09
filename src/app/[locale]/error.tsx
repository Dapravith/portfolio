'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { isLocale, localizePath } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

// Error boundary for every page under [locale]. Pages are static, so this is
// mostly reached through a failed client navigation; it never shows error details.
export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  return (
    <div className="page pt-10 pb-section md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 md:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <p className="label mb-4 md:pt-3">Error</p>
      <div className="min-w-0" role="alert">
        <h1 className="font-serif text-display font-semibold tracking-[-0.02em]">{t.error.title}</h1>
        <p className="mt-5 max-w-prose text-lead text-muted">{t.error.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            {t.error.retry}
          </button>
          <Link href={localizePath('/', locale)} className="btn btn-secondary">
            {t.notFound.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
