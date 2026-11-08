import { AiEngineering } from '@/components/ai-engineering';
import { SkillTabs } from '@/components/skill-tabs';
import { TechIcon } from '@/components/tech-icon';
import { skillGroups, skillItemTranslations } from '@/content/skills';
import type { Locale } from '@/i18n/config';

// Which skill groups each tab shows, in display order.
const tabs = [
  { id: 'frontend', en: 'Frontend', km: 'ផ្នែកខាងមុខ', groups: ['frontend', 'languages'] },
  { id: 'backend', en: 'Backend', km: 'ផ្នែកខាងក្រោយ', groups: ['backend', 'engineering', 'data', 'identity'] },
  { id: 'delivery', en: 'Tools & DevOps', km: 'ឧបករណ៍ និង DevOps', groups: ['delivery'] },
  { id: 'ai', en: 'AI Assisted Tools', km: 'ឧបករណ៍ AI', groups: [] },
] as const;

const groupsById = new Map(skillGroups.map((group) => [group.id, group]));

function SkillList({ groupIds, locale }: { groupIds: readonly string[]; locale: Locale }) {
  return (
    <dl className="border-b border-rule">
      {groupIds.flatMap((id) => groupsById.get(id) ?? []).map((group) => (
        <div key={group.id} className="grid gap-2 border-t border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
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

// Server-rendered panels (icons add no client JavaScript); SkillTabs only switches between them.
export function Skills({ locale }: { locale: Locale }) {
  return (
    <SkillTabs
      label={locale === 'km' ? 'ប្រភេទជំនាញ' : 'Skill categories'}
      tabs={tabs.map((tab) => ({ id: tab.id, label: tab[locale] }))}
      panels={tabs.map((tab) =>
        tab.id === 'ai' ? <AiEngineering key={tab.id} locale={locale} /> : <SkillList key={tab.id} groupIds={tab.groups} locale={locale} />,
      )}
    />
  );
}
