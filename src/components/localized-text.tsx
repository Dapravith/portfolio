import type { ElementType, ReactNode } from 'react';
import type { Localized } from '@/content';
import type { Locale } from '@/i18n/config';
import { pick } from '@/lib/site';

/**
 * Renders localized content. When Khmer is missing, the English fallback is
 * marked `lang="en"` so assistive tech and font selection use English rules.
 */
export function T({
  value,
  locale,
  as,
  className,
}: {
  value: Localized;
  locale: Locale;
  as?: ElementType;
  className?: string;
}): ReactNode {
  const { text, fallback } = pick(value, locale);
  const Tag = as ?? 'span';
  if (!fallback && !as && !className) return text;
  return (
    <Tag className={className} lang={fallback ? 'en' : undefined}>
      {text}
    </Tag>
  );
}
