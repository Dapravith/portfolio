import { TechIcon } from '@/components/ui/tech-icon';
import { content } from '@/content';
import { skillItemTranslations } from '@/content/skills';
import type { Locale } from '@/i18n/config';

/** Engineering toolkit: one row per area, names next to icons, no scores. */
export function Skills({ locale }: { locale: Locale }) {
  return (
    <dl className="border-b border-rule">
      {content.skillGroups.map((group) => (
        <div key={group.id} className="grid gap-2 border-t border-rule py-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
          <dt className="font-medium">{group.title[locale] ?? group.title.en}</dt>
          <dd>
            <ul className="tags !gap-x-5 !gap-y-2 !text-small !text-ink">
              {group.items.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <TechIcon name={item} className="h-[1.1em] w-[1.1em] text-muted" />
                  <span>{locale === 'km' ? (skillItemTranslations[item] ?? item) : item}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
