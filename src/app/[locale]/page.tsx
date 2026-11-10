import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AiEngineering } from '@/components/ai-engineering';
import { EngineeringApproach } from '@/components/engineering-approach';
import { ExternalLink } from '@/components/external-link';
import { ArrowRight, Download } from '@/components/icons';
import { T } from '@/components/localized-text';
import { Section } from '@/components/section';
import { WorkItem } from '@/components/work-item';
import { content, getFeaturedProjects } from '@/content';
import { isLocale, localizePath, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { personJsonLd } from '@/lib/json-ld';
import { formatDate, formatWorkYears, pageMetadata, text } from '@/lib/site';

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
  const { profile, experience } = content;
  const featured = getFeaturedProjects();
  const latest = experience[0];

  const allProjects = (
    <Link href={localizePath('/projects', locale)} className="link text-small">
      {t.home.allProjects}
    </Link>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }} />

      <section aria-labelledby="intro-title" className="page hero-panel pt-10 pb-section md:pt-16">
        <div className="grid gap-y-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="w-24 sm:w-28 md:w-full">
            <Image
              src={profile.photo.src}
              alt={text(profile.photo.alt, locale)}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="(min-width: 1024px) 13rem, (min-width: 768px) 11rem, 7rem"
              preload
              className="aspect-square w-full rounded-full border border-rule object-cover"
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

            <dl className="mt-8 grid max-w-[46rem] gap-x-10 gap-y-5 border-t border-rule pt-6 text-small sm:grid-cols-2">
              <div>
                <dt className="label">{t.home.focus}</dt>
                <dd className="mt-1">{t.home.focusValue}</dd>
              </div>
              <div>
                <dt className="label">{t.home.recent}</dt>
                <dd className="mt-1">
                  <T value={latest.role} locale={locale} />, <T value={latest.org} locale={locale} />{' '}
                  <span className="text-muted">({formatWorkYears(latest.start, latest.end, t.about.present)})</span>
                </dd>
              </div>
              {profile.availability.open && (
                <div>
                  <dt className="label">{t.home.status}</dt>
                  <dd className="mt-1">
                    {profile.availability.confirmed ? (
                      <>
                        <T value={profile.availability.note} locale={locale} />{' '}
                        <span className="text-muted">
                          ({t.home.statusAsOf} {formatDate(profile.availability.updated, locale)})
                        </span>
                      </>
                    ) : (
                      t.home.statusUnconfirmed
                    )}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                {t.home.ctaWork}
                <ArrowRight />
              </a>
              <a href={profile.resume.href} download className="btn btn-secondary">
                <Download />
                {t.home.ctaResume}
                <span className="font-mono text-meta text-muted">PDF · {profile.resume.sizeKb} KB</span>
              </a>
              <Link href={localizePath('/contact', locale)} className="btn btn-secondary">
                {t.home.ctaContact}
              </Link>
            </div>
            <ul aria-label={t.home.profiles} className="mt-4 flex flex-wrap gap-x-6 text-small">
              <li>
                <ExternalLink href={profile.links.github} newTabLabel={t.a11y.opensNewTab} className="link inline-flex min-h-11 items-center gap-0.5">
                  GitHub
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={profile.links.linkedin} newTabLabel={t.a11y.opensNewTab} className="link inline-flex min-h-11 items-center gap-0.5">
                  LinkedIn
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="work"
        label={t.home.workLabel}
        title={t.home.workTitle}
        intro={<p>{t.home.workIntro}</p>}
        aside={<p className="mt-3 hidden md:block">{allProjects}</p>}
      >
        <div>
          {featured.map((project, i) => (
            <WorkItem key={project.slug} project={project} index={i} locale={locale} t={t} />
          ))}
        </div>
        <p className="mt-2 border-t border-rule pt-6 md:hidden">{allProjects}</p>
      </Section>

      <Section id="approach" label={t.home.approachLabel} title={t.home.approachTitle} intro={<p>{t.home.approachIntro}</p>}>
        <EngineeringApproach locale={locale} t={t} />
      </Section>

      <Section id="experience" label={t.home.experienceLabel} title={t.home.experienceTitle}>
        <ol className="border-b border-rule">
          {experience.map((job) => (
            <li key={job.id} className="grid gap-1 border-t border-rule py-5 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-x-8">
              <p className="font-mono text-meta whitespace-nowrap text-muted sm:pt-1">
                {formatWorkYears(job.start, job.end, t.about.present)}
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

      <Section id="ai" label={t.home.aiLabel} title={t.home.aiTitle} intro={<p>{t.home.aiIntro}</p>}>
        <AiEngineering locale={locale} t={t} />
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
        </div>
      </Section>
    </>
  );
}
