import Link from 'next/link';
import type { Project } from '@/content';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { ExternalLink } from './external-link';
import { ArrowRight } from './icons';
import { T } from './localized-text';

/**
 * Homepage project entry: the problem, my part and the result side by side, so
 * a reader sees the engineering before the technology list.
 */
export function WorkItem({ project, index, locale, t }: { project: Project; index: number; locale: Locale; t: Dictionary }) {
  const href = localizePath(`/projects/${project.slug}`, locale);
  const headingId = `work-${project.slug}`;
  const rows = [
    { label: t.home.problem, value: project.brief.problem },
    { label: t.home.contribution, value: project.brief.contribution },
    { label: t.home.result, value: project.brief.result },
  ];
  return (
    <article aria-labelledby={headingId} className="border-t border-rule py-9 first:border-t-0 first:pt-0">
      <p className="label">
        <span className="text-ink">{String(index + 1).padStart(2, '0')}</span> · {project.year} ·{' '}
        {project.categories.map((c) => t.projects.categories[c]).join(' · ')}
      </p>
      <h3 id={headingId} className="mt-2 font-serif text-h3 font-semibold">
        <Link href={href} className="hover:text-accent">
          <T value={project.title} locale={locale} />
        </Link>
      </h3>

      <dl className="mt-5 grid gap-x-8 gap-y-4 border-l-2 border-rule pl-4 md:grid-cols-3 md:border-l-0 md:border-t md:pt-4 md:pl-0">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="label">{row.label}</dt>
            <T as="dd" value={row.value} locale={locale} className="mt-1 text-small" />
          </div>
        ))}
      </dl>

      <div className="mt-5 space-y-2">
        <ul className="tags" aria-label={t.caseStudy.stack}>
          {project.stack.slice(0, 6).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {project.stack.length > 6 && <li aria-hidden>+{project.stack.length - 6}</li>}
        </ul>
        <div className="flex flex-wrap gap-x-6 text-small">
          <Link href={href} className="link inline-flex min-h-11 items-center gap-1.5 font-medium text-ink">
            {t.projects.readCaseStudy}
            <ArrowRight />
            <span className="sr-only">
              : <T value={project.title} locale={locale} />
            </span>
          </Link>
          <span className="inline-flex min-h-11 items-center">
            <ExternalLink href={project.repo} newTabLabel={t.a11y.opensNewTab}>
              {t.projects.source}
              <span className="sr-only">
                {' '}
                <T value={project.title} locale={locale} />
              </span>
            </ExternalLink>
          </span>
        </div>
      </div>
    </article>
  );
}
