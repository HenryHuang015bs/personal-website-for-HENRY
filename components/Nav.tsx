"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Languages } from "lucide-react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "skills", href: "#skills" },
    { key: "timeline", href: "#timeline" },
    { key: "contact", href: "#contact" },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 左上角 */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[#052659] dark:text-slate-100 font-semibold text-lg hover:scale-105 transition-transform duration-300"
            aria-label="Home"
          >
            Henry Huang
          </a>
          {/* Navigation Items and Controls - 右上角 */}
          <div className="flex items-center gap-4">
            {/* Navigation Items */}
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-[#052659] dark:text-slate-200 hover:text-[#052659]/90 dark:hover:text-slate-100 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#052659]/40 dark:focus-visible:ring-slate-400/40 rounded px-2 py-1"
                  aria-label={t("nav", item.key as any)}
                >
                  {t("nav", item.key as any)}
                </a>
              ))}
            </div>
            
            {/* Language Toggle Button */}
            <button
              onClick={handleLanguageToggle}
              className="p-2 rounded-lg text-[#052659] dark:text-slate-200 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#052659]/40 dark:focus-visible:ring-slate-400/40"
              aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
              title={language === "zh" ? "Switch to English" : "切换到中文"}
            >
              <Languages size={18} />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#052659] dark:text-slate-200 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#052659]/40 dark:focus-visible:ring-slate-400/40"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

