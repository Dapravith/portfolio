import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from '@/components/icons';
import { T } from '@/components/localized-text';
import { ProjectRow } from '@/components/project-row';
import { Section } from '@/components/section';
import { content, getFeaturedProjects } from '@/content';
import { isLocale, localizePath, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { personJsonLd } from '@/lib/json-ld';
import { formatDate, formatMonth, pageMetadata, text } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, path: '/', description: getDictionary(locale).meta.description });
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const { profile, experience, capabilities } = content;
  const featured = getFeaturedProjects();
  const latest = experience[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }} />

      <section aria-labelledby="intro-title" className="page pt-10 pb-section md:pt-16">
        <div className="grid gap-y-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="w-24 sm:w-28 md:w-full">
            <Image
              src={profile.photo.src}
              alt={text(profile.photo.alt, locale)}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="(min-width: 1024px) 13rem, (min-width: 768px) 11rem, 7rem"
              preload
              className="aspect-[4/5] w-full rounded-sm object-cover object-[50%_20%]"
            />
          </div>

          <div className="min-w-0">
            <p className="label">
              <T value={profile.role} locale={locale} /> · <T value={profile.location} locale={locale} />
            </p>
            <h1 id="intro-title" className="mt-3 font-serif text-display font-semibold tracking-[-0.02em]">
              {profile.name}
            </h1>
            <T as="p" value={profile.lead} locale={locale} className="mt-5 max-w-[40rem] text-lead" />

            <dl className="mt-10 grid max-w-[46rem] gap-x-10 gap-y-5 border-t border-rule pt-6 text-small sm:grid-cols-2">
              <div>
                <dt className="label">{t.home.focus}</dt>
                <dd className="mt-1">{t.home.focusValue}</dd>
              </div>
              <div>
                <dt className="label">{t.home.recent}</dt>
                <dd className="mt-1">
                  <T value={latest.role} locale={locale} />, <T value={latest.org} locale={locale} />{' '}
                  <span className="text-muted">
                    ({formatMonth(latest.start, locale)} – {latest.end ? formatMonth(latest.end, locale) : t.about.present})
                  </span>
                </dd>
              </div>
              <div>
                <dt className="label">{t.home.based}</dt>
                <dd className="mt-1">
                  <T value={profile.location} locale={locale} /> ({profile.timezone})
                </dd>
              </div>
              {profile.availability.open && (
                <div>
                  <dt className="label">{t.home.status}</dt>
                  <dd className="mt-1">
                    <T value={profile.availability.note} locale={locale} />{' '}
                    <span className="text-muted">
                      ({t.home.statusAsOf} {formatDate(profile.availability.updated, locale)})
                    </span>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#work" className="btn btn-primary">
                {t.home.ctaWork}
                <ArrowRight />
              </a>
              <a href={profile.resume.href} download className="btn btn-secondary">
                <Download />
                {t.home.ctaResume}
                <span className="font-mono text-meta text-muted">PDF · {profile.resume.sizeKb} KB</span>
              </a>
              <Link href={localizePath('/contact', locale)} className="link inline-flex min-h-11 items-center px-1 text-small font-medium">
                {t.home.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="work"
        label={t.home.workLabel}
        title={t.home.workTitle}
        intro={<p>{t.home.workIntro}</p>}
        aside={
          <Link href={localizePath('/projects', locale)} className="link mt-3 hidden text-small md:inline-block">
            {t.home.allProjects}
          </Link>
        }
      >
        <div>
          {featured.map((project) => (
            <ProjectRow key={project.slug} project={project} locale={locale} t={t} />
          ))}
        </div>
        <p className="mt-8 border-t border-rule pt-6 md:hidden">
          <Link href={localizePath('/projects', locale)} className="link text-small">
            {t.home.allProjects}
          </Link>
        </p>
      </Section>

      <Section id="experience" label={t.home.experienceLabel} title={t.home.experienceTitle}>
        <ol className="border-b border-rule">
          {experience.map((job) => (
            <li key={job.id} className="grid gap-1 border-t border-rule py-5 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-x-8">
              <p className="font-mono text-meta whitespace-nowrap text-muted sm:pt-1">
                {formatMonth(job.start, locale)} – {job.end ? formatMonth(job.end, locale) : t.about.present}
              </p>
              <div className="min-w-0">
                <h3 className="font-medium">
                  <T value={job.role} locale={locale} />
                  <span className="text-muted"> · </span>
                  <T value={job.org} locale={locale} />
                </h3>
                <T as="p" value={job.summary} locale={locale} className="mt-1 text-small text-muted" />
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6">
          <Link href={localizePath('/about', locale)} className="link text-small">
            {t.home.fullBackground}
          </Link>
        </p>
      </Section>

      <Section id="capabilities" label={t.home.capabilitiesLabel} title={t.home.capabilitiesTitle}>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {capabilities.map((c) => (
            <div key={c.title.en} className="border-t-2 border-ink pt-4">
              <h3 className="font-semibold">
                <T value={c.title} locale={locale} />
              </h3>
              <T as="p" value={c.body} locale={locale} className="mt-2 text-small text-muted" />
              <ul className="tags mt-4">
                {c.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" label={t.home.contactLabel} title={t.home.contactTitle} intro={<p>{t.home.contactBody}</p>}>
        <p>
          <a
            href={`mailto:${profile.email}`}
            className="font-serif text-h3 font-semibold break-all decoration-accent decoration-2 underline-offset-[0.2em] hover:underline sm:text-h2"
          >
            {profile.email}
          </a>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={localizePath('/contact', locale)} className="btn btn-secondary">
            {t.home.contactForm}
          </Link>
          <a href={profile.resume.href} download className="btn btn-secondary">
            <Download />
            {t.home.ctaResume}
          </a>
        </div>
      </Section>
    </>
  );
}
