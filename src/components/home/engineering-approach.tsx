import Link from 'next/link';
import { content } from '@/content';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { T } from '@/components/ui/localized-text';

/** The eight-step engineering loop; each step links to where it can be checked. */
export function EngineeringApproach({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <ol className="grid gap-x-8 gap-y-9 sm:grid-cols-2 xl:grid-cols-4">
      {content.approach.map((step, i) => (
        <li key={step.id} className="flex flex-col border-t-2 border-ink pt-3">
          <p className="font-mono text-meta text-muted">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="mt-1 font-semibold">
            <T value={step.title} locale={locale} />
          </h3>
          <T as="p" value={step.body} locale={locale} className="mt-2 text-small text-muted" />
          <p className="mt-auto pt-3 text-small">
            <span className="sr-only">{t.home.approachEvidence}: </span>
            <Link href={localizePath(step.evidence.href, locale)} className="link inline-flex min-h-11 items-center">
              <T value={step.evidence.text} locale={locale} />
            </Link>
          </p>
        </li>
      ))}
    </ol>
  );
}
