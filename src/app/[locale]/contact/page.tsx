import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { ExternalLink } from '@/components/external-link';
import { Download } from '@/components/icons';
import { PageHeader } from '@/components/section';
import { content } from '@/content';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { isContactConfigured } from '@/lib/contact/deliver';
import { pageMetadata } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: '/contact', title: t.contact.title, description: t.contact.intro });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const { profile } = content;
  // Evaluated at build time; set the env vars in Vercel and redeploy to enable the form.
  const formEnabled = isContactConfigured();

  return (
    <>
      <PageHeader title={t.contact.title}>
        <p>{t.contact.intro}</p>
      </PageHeader>
      <div className="border-t border-rule py-section">
        <div className="page grid gap-12 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <p className="label md:pt-1">{t.contact.direct}</p>
          <div className="grid min-w-0 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-x-16">
            <dl className="space-y-6">
              <div>
                <dt className="label">{t.contact.email}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${profile.email}`} className="link font-serif text-h3 font-semibold break-all">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">Telegram</dt>
                <dd className="mt-1 space-x-3">
                  <ExternalLink href={`https://t.me/${profile.telegram.username}`} newTabLabel={t.a11y.opensNewTab}>
                    @{profile.telegram.username}
                  </ExternalLink>
                  <a href={`tel:${profile.telegram.phone}`} className="link whitespace-nowrap">
                    {profile.telegram.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">LinkedIn</dt>
                <dd className="mt-1">
                  <ExternalLink href={profile.links.linkedin} newTabLabel={t.a11y.opensNewTab}>
                    linkedin.com/in/rotha-dapravith
                  </ExternalLink>
                </dd>
              </div>
              <div>
                <dt className="label">GitHub</dt>
                <dd className="mt-1">
                  <ExternalLink href={profile.links.github} newTabLabel={t.a11y.opensNewTab}>
                    github.com/Dapravith
                  </ExternalLink>
                </dd>
              </div>
              <div>
                <dt className="label">{t.nav.resume}</dt>
                <dd className="mt-1">
                  <a href={profile.resume.href} download className="link inline-flex items-center gap-1.5">
                    <Download />
                    {t.home.ctaResume} <span className="font-mono text-meta text-muted">PDF · {profile.resume.sizeKb} KB</span>
                  </a>
                </dd>
              </div>
            </dl>

            <section aria-labelledby="form-title">
              <h2 id="form-title" className="font-serif text-h3 font-semibold">
                {t.contact.formTitle}
              </h2>
              <div className="mt-6">
                {formEnabled ? (
                  <ContactForm copy={t.contact} email={profile.email} />
                ) : (
                  <p className="border-l-2 border-rule-strong pl-4 text-muted" data-testid="contact-disabled">
                    {t.contact.disabled}{' '}
                    <a className="link text-ink" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
