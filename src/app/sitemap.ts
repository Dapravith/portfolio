import type { MetadataRoute } from 'next';
import { content } from '@/content';
import { localizePath, locales } from '@/i18n/config';
import { absoluteUrl, contentReviewed } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/projects',
    '/about',
    '/contact',
    ...content.projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: absoluteUrl(localizePath(path, 'en')),
    lastModified: contentReviewed,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localizePath(path, l))])),
    },
  }));
}
