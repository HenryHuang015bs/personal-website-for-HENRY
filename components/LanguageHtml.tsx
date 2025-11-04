"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageHtml() {
  const { language } = useLanguage();

  useEffect(() => {
    // Update HTML lang attribute based on current language
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    }
  }, [language]);

  return null;
}

