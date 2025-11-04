"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Languages } from "lucide-react";

export default function TestPage() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div className="min-h-screen bg-[hsl(35,67%,95%)] dark:bg-[hsl(222,47%,11%)] p-8">
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

      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-[#052659] dark:text-slate-100 mb-4">
          Test Page Works!
        </h1>
        <p className="text-lg text-[#052659]/80 dark:text-slate-300">
          Current language: {language === "zh" ? "中文" : "English"}
        </p>
        <p className="text-lg text-[#052659]/80 dark:text-slate-300">
          Current theme: {theme === "light" ? "Light" : "Dark"}
        </p>
      </div>
    </div>
  );
}

