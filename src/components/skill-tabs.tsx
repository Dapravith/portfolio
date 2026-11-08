'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { AiEngineering } from '@/components/ai-engineering';
import { skillGroups } from '@/content/skills';
import type { Locale } from '@/i18n/config';

const tabs = [
  { id: 'frontend', en: 'Frontend', km: 'ផ្នែកខាងមុខ', groups: ['frontend', 'languages'] },
  { id: 'backend', en: 'Backend', km: 'ផ្នែកខាងក្រោយ', groups: ['backend', 'data', 'identity'] },
  { id: 'delivery', en: 'Tools & DevOps', km: 'ឧបករណ៍ និង DevOps', groups: ['delivery'] },
  { id: 'ai', en: 'AI Assisted Tools', km: 'ឧបករណ៍ AI', groups: [] },
] as const;

export function SkillTabs({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (active + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  }
  const selected = tabs[active];
  return (
    <div>
      <div role="tablist" aria-label={locale === 'km' ? 'ប្រភេទជំនាញ' : 'Skill categories'} className="grid grid-cols-2 gap-1 border-b border-rule sm:grid-cols-4">
        {tabs.map((tab, index) => <button key={tab.id} ref={(node) => { buttons.current[index] = node; }} id={`skill-tab-${tab.id}`} role="tab" aria-selected={index === active} aria-controls={`skill-panel-${tab.id}`} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={onKeyDown} className="min-h-11 border-b-2 border-transparent px-3 py-2 text-small text-muted hover:text-ink aria-selected:border-accent aria-selected:font-semibold aria-selected:text-ink">{tab[locale]}</button>)}
      </div>
      {tabs.filter((tab) => tab.id !== selected.id).map((tab) => <div key={tab.id} role="tabpanel" id={`skill-panel-${tab.id}`} aria-labelledby={`skill-tab-${tab.id}`} hidden />)}
      <div role="tabpanel" id={`skill-panel-${selected.id}`} aria-labelledby={`skill-tab-${selected.id}`} tabIndex={0} className="pt-6">
        {selected.id === 'ai' ? <AiEngineering locale={locale} /> : <dl className="border-b border-rule">{skillGroups.filter((group) => (selected.groups as readonly string[]).includes(group.id)).map((group) => <div key={group.id} className="grid gap-2 border-t border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)]"><dt className="font-medium">{group.title[locale] ?? group.title.en}</dt><dd><ul className="tags !text-small !text-ink">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>)}</dl>}
      </div>
    </div>
  );
}
