'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from './icons';

// The initial class is set by an inline script in the layout before paint,
// so this component only mirrors and flips it.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}
const isDark = () => document.documentElement.classList.contains('dark');

export function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = !isDark();
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the choice still applies to this page.
    }
  }

  const label = dark ? toLight : toDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded text-muted hover:text-ink"
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}

export const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`;
