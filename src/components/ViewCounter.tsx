'use client';
import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';

let viewRequest: Promise<number | null> | null = null;
function recordView() {
  if (!viewRequest) viewRequest = fetch('/api/analytics/views', { method: 'POST' }).then(async (response) => {
    if (!response.ok) return null;
    const result = await response.json();
    return typeof result.data?.uniqueBrowsers === 'number' ? result.data.uniqueBrowsers as number : null;
  }).catch(() => null);
  return viewRequest;
}
export function ViewCounter({ locale }: { locale: Locale }) {
  const [views, setViews] = useState<number | null | undefined>(undefined);
  useEffect(() => { let active = true; void recordView().then((count) => { if (active) setViews(count); }); return () => { active = false; }; }, []);
  const value = views === undefined ? '—' : views === null ? (locale === 'km' ? 'មិនទាន់មាន' : 'Unavailable') : views.toLocaleString(locale === 'km' ? 'km-KH' : 'en-US');
  return <span>{locale === 'km' ? 'កម្មវិធីរុករកផ្សេងគ្នា' : 'Unique browsers'}: {value}</span>;
}
