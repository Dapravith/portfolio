import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { ExternalLink } from '@/components/external-link';
import { ArrowRight } from '@/components/icons';
import { T } from '@/components/localized-text';
import { content, getAdjacentProject, getProject } from '@/content';
import { isLocale, localizePath, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { projectJsonLd } from '@/lib/json-ld';
import { pageMetadata, text } from '@/lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => content.projects.map((p) => ({ locale, slug: p.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: text(project.title, locale),
    description: text(project.summary, locale),
  });
}

const sectionOrder = [
  'context',
  'challenge',
  'role',
  'architecture',
  'choices',
  'implementation',
  'security',
  'testing',
  'limitations',
  'outcome',
] as const;

export default async function CaseStudyPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const project = getProject(slug);
  if (!project) notFound();
  const t = getDictionary(locale);
  const cs = project.caseStudy;
  const next = getAdjacentProject(slug);
  const englishOnly = locale !== 'en' && t.caseStudy.englishOnly;

  const body: Record<(typeof sectionOrder)[number], ReactNode> = {
    context: <T as="p" value={cs.context} locale={locale} />,
    challenge: <T as="p" value={cs.challenge} locale={locale} />,
    role: <T as="p" value={cs.role} locale={locale} />,
    architecture: (
      <>
        <T as="p" value={cs.architecture.summary} locale={locale} />
        <div className="mt-6">
          <ArchitectureDiagram
            diagram={cs.architecture.diagram}
            caption={t.caseStudy.diagramCaption}
            flowsHeading={t.caseStudy.flowsHeading}
          />
        </div>
      </>
    ),
    choices: (
      <dl className="border-b border-rule">
        {cs.choices.map((c) => (
          <div key={c.tech} className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-x-6">
            <dt className="font-mono text-small font-medium">{c.tech}</dt>
            <T as="dd" value={c.reason} locale={locale} className="text-small text-muted" />
          </div>
        ))}
      </dl>
    ),
    implementation: (
      <div className="prose-block">
        {cs.implementation.map((p) => (
          <T key={p.en} as="p" value={p} locale={locale} />
        ))}
      </div>
    ),
    security: (
      <ul className="bullets">
        {cs.security.map((s) => (
          <T key={s.en} as="li" value={s} locale={locale} />
        ))}
      </ul>
    ),
    testing: <T as="p" value={cs.testing} locale={locale} />,
    limitations: (
      <ul className="bullets">
        {cs.limitations.map((s) => (
          <T key={s.en} as="li" value={s} locale={locale} />
        ))}
      </ul>
    ),
    outcome: <T as="p" value={cs.outcome} locale={locale} />,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, locale)) }} />

      <header className="page pt-10 pb-12 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 md:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label={t.a11y.breadcrumb} className="mb-4 md:mb-0 md:pt-3">
          <Link href={localizePath('/projects', locale)} className="link label">
            ← {t.caseStudy.back}
          </Link>
        </nav>
        <div className="min-w-0">
          <h1 className="font-serif text-display font-semibold tracking-[-0.02em]">
            <T value={project.title} locale={locale} />
          </h1>
          <T as="p" value={project.summary} locale={locale} className="mt-5 max-w-[42rem] text-lead text-muted" />

          <dl className="mt-10 grid max-w-[46rem] gap-x-10 gap-y-5 border-t border-rule pt-6 text-small sm:grid-cols-3">
            <div>
              <dt className="label">{t.caseStudy.type}</dt>
              <dd className="mt-1">{t.caseStudy.typeValue}</dd>
            </div>
            <div>
              <dt className="label">{t.caseStudy.year}</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="label">{t.caseStudy.status}</dt>
              <dd className="mt-1">{t.projects.status[project.status]}</dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="label">{t.caseStudy.stack}</dt>
              <dd className="mt-1">
                <ul className="tags !text-small">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="label">{t.caseStudy.repository}</dt>
              <dd className="mt-1 break-all">
                <ExternalLink href={project.repo} newTabLabel={t.a11y.opensNewTab}>
                  {project.repo.replace('https://', '')}
                </ExternalLink>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="border-t border-rule py-section">
        <div className="page lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-10">
          <nav aria-label={t.a11y.onThisPage} className="hidden lg:block">
            <div className="sticky top-6">
              <p className="label">{t.a11y.onThisPage}</p>
              <ol className="mt-3 space-y-1.5 text-small">
                {sectionOrder.map((key) => (
                  <li key={key}>
                    <a href={`#${key}`} className="text-muted hover:text-ink">
                      {t.caseStudy.sections[key]}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 max-w-[44rem]">
            {englishOnly && (
              <p className="mb-10 border-l-2 border-accent pl-4 text-small text-muted">{englishOnly}</p>
            )}
            {sectionOrder.map((key, i) => (
              <section
                key={key}
                id={key}
                aria-labelledby={`${key}-title`}
                className={`scroll-mt-6 ${i > 0 ? 'mt-14' : ''}`}
              >
                <h2 id={`${key}-title`} className="font-serif text-h3 font-semibold">
                  {t.caseStudy.sections[key]}
                </h2>
                <div className="mt-3">{body[key]}</div>
              </section>
            ))}

            {next && (
              <p className="mt-16 border-t border-rule pt-6">
                <span className="label block">{t.caseStudy.next}</span>
                <Link
                  href={localizePath(`/projects/${next.slug}`, locale)}
                  className="mt-2 inline-flex items-center gap-2 font-serif text-h3 font-semibold hover:text-accent"
                >
                  <T value={next.title} locale={locale} />
                  <ArrowRight />
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
