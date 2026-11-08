"use client";

import { useSyncExternalStore } from "react";
import { Clock3 } from "lucide-react";
import { useLanguage } from "@/store/languageStore";

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 1000);
  return () => window.clearInterval(timer);
}

function getCurrentMinute() {
  return Math.floor(Date.now() / 60_000);
}

export function PhnomPenhTime() {
  const { language } = useLanguage();
  const minute = useSyncExternalStore(subscribe, getCurrentMinute, () => null);
  const time = minute === null ? "--:--" : new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Phnom_Penh",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(minute * 60_000);

  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-300">
      <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{language === "km" ? "ភ្នំពេញ" : "Phnom Penh"} · <time className="font-medium text-slate-100">{time}</time> (UTC+7)</span>
    </span>
  );
}
