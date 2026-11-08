'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Tab = { id: string; label: string };

// Accessible tabs over server-rendered panels; see `skills.tsx` for the content.
export function SkillTabs({ label, tabs, panels }: { label: string; tabs: Tab[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (active + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    buttons.current[next]?.focus();
  }
  return (
    <div>
      <div role="tablist" aria-label={label} className="grid grid-cols-2 gap-1 border-b border-rule sm:grid-cols-4">
        {tabs.map((tab, index) => <button key={tab.id} type="button" ref={(node) => { buttons.current[index] = node; }} id={`skill-tab-${tab.id}`} role="tab" aria-selected={index === active} aria-controls={`skill-panel-${tab.id}`} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={onKeyDown} className="min-h-11 border-b-2 border-transparent px-3 py-2 text-small text-muted hover:text-ink aria-selected:border-accent aria-selected:font-semibold aria-selected:text-ink">{tab.label}</button>)}
      </div>
      {tabs.map((tab, index) => (
        <div key={tab.id} role="tabpanel" id={`skill-panel-${tab.id}`} aria-labelledby={`skill-tab-${tab.id}`} tabIndex={0} hidden={index !== active} className="pt-6">
          {panels[index]}
        </div>
      ))}
    </div>
  );
}
