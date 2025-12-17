import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, translations } from '@/config/translations';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.en;
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language: Language) => {
        set({ language, t: translations[language] });
        if (typeof window !== 'undefined') {
          document.documentElement.lang = language;
        }
      },
      t: translations.en,
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.language];
        }
      },
    }
  )
);
