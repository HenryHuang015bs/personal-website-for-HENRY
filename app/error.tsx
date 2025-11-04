'use client'

import { useEffect } from 'react'
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Languages } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[hsl(35,67%,95%)] dark:bg-[hsl(222,47%,11%)] p-8">
      {/* Theme and Language Toggle - Top Right */}
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <button
          onClick={handleLanguageToggle}
          className="p-2 rounded-lg text-[#052659] dark:text-slate-200 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors duration-300"
          aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
          title={language === "zh" ? "Switch to English" : "切换到中文"}
        >
          <Languages size={18} />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[#052659] dark:text-slate-200 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors duration-300"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#052659] dark:text-slate-100">{t("error", "title")}</h1>
        <p className="text-lg text-[#052659]/80 dark:text-slate-300">
          {error.message || t("error", "description")}
        </p>
        {error.digest && (
          <p className="text-sm text-[#052659]/60 dark:text-slate-400">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#93C2E2] hover:bg-[#C8E3F5] dark:bg-slate-700 dark:hover:bg-slate-600 text-[#052659] dark:text-slate-100 rounded-lg font-medium transition-colors duration-200"
        >
          {t("error", "tryAgain")}
        </button>
      </div>
    </div>
  )
}

