import { content, type JournalEntry, type Project } from '@/content';
import { localizePath, type Locale } from '@/i18n/config';
import { absoluteUrl, text } from './site';

export function personJsonLd(locale: Locale) {
  const { profile, experience } = content;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: absoluteUrl(localizePath('/', locale)),
    image: absoluteUrl(profile.photo.src),
    jobTitle: text(profile.role, locale),
    email: `mailto:${profile.email}`,
    telephone: profile.telegram.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Phnom Penh', addressCountry: 'KH' },
    sameAs: [profile.links.github, profile.links.linkedin, `https://t.me/${profile.telegram.username}`],
    alumniOf: content.education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution.en })),
    knowsLanguage: ['km', 'en'],
    worksFor: experience[0]?.end ? undefined : { '@type': 'Organization', name: experience[0]?.org.en },
  };
}

export function projectJsonLd(project: Project, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: text(project.title, locale),
    description: text(project.summary, locale),
    url: absoluteUrl(localizePath(`/projects/${project.slug}`, locale)),
    codeRepository: project.repo,
    keywords: project.stack.join(', '),
    dateModified: String(project.year),
    author: { '@type': 'Person', name: content.profile.name, url: absoluteUrl('/') },
  };
}

export function articleJsonLd(entry: JournalEntry, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: text(entry.title, locale),
    description: text(entry.summary, locale),
    url: absoluteUrl(localizePath(`/journal/${entry.slug}`, locale)),
    datePublished: entry.published,
    inLanguage: 'en',
    keywords: entry.tags.join(', '),
    author: { '@type': 'Person', name: content.profile.name, url: absoluteUrl('/') },
  };
}
