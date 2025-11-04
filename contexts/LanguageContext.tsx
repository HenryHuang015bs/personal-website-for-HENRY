"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { translations, Language } from "@/config/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T extends keyof typeof translations.zh>(
    section: T,
    key?: keyof typeof translations.zh[T]
  ) => any;
}

const defaultLanguage: Language = "zh";

// Helper function to get translation with default language
function getDefaultT<T extends keyof typeof translations.zh>(
  section: T,
  key?: keyof typeof translations.zh[T]
): any {
  const sectionTranslations = translations[defaultLanguage][section];
  if (key === undefined) {
    return sectionTranslations;
  }
  return (sectionTranslations as any)[key];
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: getDefaultT,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with default, will be updated in useEffect
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    // Load language from localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "zh" || savedLanguage === "en")) {
        setLanguageState(savedLanguage);
      } else {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("zh")) {
          setLanguageState("zh");
        } else {
          setLanguageState("en");
        }
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  }, []);

  const t = useCallback(function <T extends keyof typeof translations.zh>(
    section: T,
    key?: keyof typeof translations.zh[T]
  ): any {
    const sectionTranslations = translations[language][section];
    if (key === undefined) {
      return sectionTranslations;
    }
    return (sectionTranslations as any)[key];
  } as LanguageContextType["t"], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

