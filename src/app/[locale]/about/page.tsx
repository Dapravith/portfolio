import type { Metadata } from 'next';
import { Download } from '@/components/icons';
import { T } from '@/components/localized-text';
import { PageHeader, Section } from '@/components/section';
import { content } from '@/content';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { personJsonLd } from '@/lib/json-ld';
import { formatDate, formatMonth, pageMetadata, text } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: '/about', title: t.about.title, description: text(content.profile.summary, locale) });
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const { profile, experience, education, courses, skillGroups } = content;
  const range = (start: string, end: string | null) =>
    `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : t.about.present}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }} />
      <PageHeader title={t.about.title}>
        <T as="p" value={profile.summary} locale={locale} />
        <p className="mt-6">
          <a href={profile.resume.href} download className="btn btn-secondary text-ink">
            <Download />
            {t.home.ctaResume}
            <span className="font-mono text-meta text-muted">
              PDF · {profile.resume.sizeKb} KB · {formatDate(profile.resume.updated, locale)}
            </span>
          </a>
        </p>
      </PageHeader>

      <Section id="experience" label={t.about.experience}>
        <ol>
          {experience.map((job) => (
            <li key={job.id} className="border-t border-rule py-8 first:border-t-0 first:pt-0">
              <article aria-labelledby={`job-${job.id}`}>
                <p className="font-mono text-meta text-muted">
                  {range(job.start, job.end)} · <T value={job.location} locale={locale} />
                </p>
                <h2 id={`job-${job.id}`} className="mt-2 font-serif text-h3 font-semibold">
                  <T value={job.role} locale={locale} />
                </h2>
                <T as="p" value={job.org} locale={locale} className="mt-0.5 text-muted" />
                <ul className="bullets mt-4 max-w-prose">
                  {job.highlights.map((h) => (
                    <T key={h.en} as="li" value={h} locale={locale} />
                  ))}
                </ul>
                <ul className="tags mt-4" aria-label={t.caseStudy.stack}>
                  {job.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="education" label={t.about.education}>
        <ul className="space-y-6">
          {education.map((e) => (
            <li key={e.institution.en}>
              <p className="font-mono text-meta text-muted">{range(e.start, e.end)}</p>
              <h2 className="mt-2 font-serif text-h3 font-semibold">
                <T value={e.credential} locale={locale} />
              </h2>
              <p className="mt-0.5 text-muted">
                <T value={e.institution} locale={locale} />
                {e.note && (
                  <>
                    {' — '}
                    <T value={e.note} locale={locale} />
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="skills" label={t.about.skills} intro={<p>{t.about.skillsNote}</p>}>
        <dl className="border-b border-rule">
          {skillGroups.map((g) => (
            <div key={g.id} className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-x-6">
              <dt className="font-medium">
                <T value={g.title} locale={locale} />
              </dt>
              <dd>
                <ul className="tags !text-small !text-ink">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="courses" label={t.about.courses} intro={<p>{t.about.coursesNote}</p>}>
        <ul className="bullets" lang="en">
          {courses.map((c) => (
            <li key={c.title}>
              {c.title} <span className="text-muted">— {c.provider}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="languages" label={t.about.languages}>
        <p>{profile.languages.map((l) => text(l, locale)).join(' · ')}</p>
      </Section>
    </>
  );
}
