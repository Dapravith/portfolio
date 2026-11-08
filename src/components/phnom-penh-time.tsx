'use client';
import { useSyncExternalStore } from 'react';
import type { Locale } from '@/i18n/config';

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 1000);
  return () => window.clearInterval(timer);
}
function minute() { return Math.floor(Date.now() / 60_000); }
export function PhnomPenhTime({ locale }: { locale: Locale }) {
  const current = useSyncExternalStore(subscribe, minute, () => null);
  const time = current === null ? '––:––' : new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Phnom_Penh', hour: '2-digit', minute: '2-digit', hour12: false }).format(current * 60_000);
  return <span>{locale === 'km' ? 'ភ្នំពេញ' : 'Phnom Penh'} · <time>{time}</time> (UTC+7)</span>;
}
