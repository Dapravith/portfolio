"use client";

import { useLanguage } from "@/store/languageStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Language } from "@/config/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'km' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 px-2"
      aria-label="Switch language"
    >
      <div className="relative w-6 h-4 overflow-hidden rounded">
        <Image
          src={language === 'en' ? '/images/flags/en-flag.svg' : '/images/flags/kh-flag.svg'}
          alt={language === 'en' ? 'English' : 'ខ្មែរ'}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <span className="text-sm font-medium">
        {language === 'en' ? 'EN' : 'ខ្មែរ'}
      </span>
    </Button>
  );
}
