import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProjectFilter } from '@/components/project-filter';
import { ProjectRow } from '@/components/project-row';
import { PageHeader } from '@/components/section';
import { content, projectCategories } from '@/content';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { pageMetadata } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: '/projects', title: t.projects.title, description: t.projects.intro });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const { projects } = content;

  const rows = projects.map((p) => ({
    slug: p.slug,
    categories: [...p.categories],
    // Keyed here because the Suspense fallback below renders these nodes as a list too.
    node: <ProjectRow key={p.slug} project={p} locale={locale} t={t} headingLevel="h2" />,
  }));
  const options = projectCategories
    .filter((c) => projects.some((p) => p.categories.includes(c)))
    .map((c) => ({ value: c, label: t.projects.categories[c] }));
  const showing: Record<number, string> = {};
  for (let n = 0; n <= projects.length; n++) showing[n] = t.projects.showing(n);

  return (
    <>
      <PageHeader title={t.projects.title}>
        <p>{t.projects.intro}</p>
      </PageHeader>
      <div className="border-t border-rule py-section">
        <div className="page md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <p className="label mb-4 md:pt-3">{t.projects.filterLabel}</p>
          <div className="min-w-0">
            <Suspense fallback={<div className="pt-[4.75rem]">{rows.map((r) => r.node)}</div>}>
              <ProjectFilter
                items={rows}
                options={options}
                allLabel={t.projects.all}
                groupLabel={t.projects.filterLabel}
                showing={showing}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
