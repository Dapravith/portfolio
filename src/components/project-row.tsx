import Link from 'next/link';
import type { Project } from '@/content';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { ExternalLink } from './external-link';
import { ArrowRight } from './icons';
import { T } from './localized-text';

/** One project as a full-width row: what it is, what it uses, where to read more. */
export function ProjectRow({
  project,
  locale,
  t,
  headingLevel = 'h3',
}: {
  project: Project;
  locale: Locale;
  t: Dictionary;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  const href = localizePath(`/projects/${project.slug}`, locale);
  return (
    <article className="grid gap-4 border-t border-rule py-7 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-x-10">
      <div className="min-w-0">
        <p className="label">
          {project.year} · {project.categories.map((c) => t.projects.categories[c]).join(' · ')}
        </p>
        <Heading className="mt-2 font-serif text-h3 font-semibold">
          <Link href={href} className="hover:text-accent">
            <T value={project.title} locale={locale} />
          </Link>
        </Heading>
        <T as="p" className="mt-2 max-w-prose text-muted" value={project.summary} locale={locale} />
        <ul className="tags mt-4" aria-label={t.caseStudy.stack}>
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-small md:flex-col md:items-start md:pt-7">
        <Link href={href} className="link inline-flex min-h-11 items-center gap-1.5 font-medium text-ink md:min-h-0">
          {t.projects.readCaseStudy}
          <ArrowRight />
          <span className="sr-only">
            : <T value={project.title} locale={locale} />
          </span>
        </Link>
        <span className="inline-flex min-h-11 items-center md:min-h-0">
          <ExternalLink href={project.repo} newTabLabel={t.a11y.opensNewTab}>
            {t.projects.source}
            <span className="sr-only">
              {' '}
              <T value={project.title} locale={locale} />
            </span>
          </ExternalLink>
        </span>
      </div>
    </article>
  );
}
