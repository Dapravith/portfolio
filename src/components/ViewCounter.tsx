"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useLanguage } from "@/store/languageStore";

// One request per page load, including React development-mode remounts.
let viewRequest: Promise<number | null> | null = null;

function recordView() {
  if (!viewRequest) {
    viewRequest = fetch("/api/analytics/views", { method: "POST" })
      .then(async (response) => {
        if (!response.ok) return null;
        const result = await response.json();
        return typeof result.data?.uniqueBrowsers === "number" ? result.data.uniqueBrowsers : null;
      })
      .catch(() => null);
  }
  return viewRequest;
}

export function ViewCounter() {
  const { language } = useLanguage();
  const [views, setViews] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    void recordView().then((count) => {
      if (!active) return;
      if (count === null) setUnavailable(true);
      else setViews(count);
    });
    return () => { active = false; };
  }, []);

  const label = language === "km" ? "ចំនួនកម្មវិធីរុករកផ្សេងគ្នា" : "Unique browsers";
  const value = unavailable
    ? (language === "km" ? "មិនទាន់មាន" : "Unavailable")
    : views === null ? "—" : views.toLocaleString(language === "km" ? "km-KH" : "en-US");

  return (
    <span className="inline-flex items-center gap-2 text-sm text-slate-300">
      <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}: <span className="font-medium text-slate-100">{value}</span></span>
    </span>
  );
}
