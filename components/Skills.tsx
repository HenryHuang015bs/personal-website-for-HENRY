"use client";

import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconCloud } from "@/components/ui/icon-cloud";
import { toolLogos } from "@/config/toolLogos";
import VisitorCount from "./VisitorCount";

export default function Skills() {
  const { language, t } = useLanguage();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  const skillCategories = useMemo(() => {
    const skillCategoriesObj = t("skills", "categories") as any;
    const businessSkills = t("skills", "businessSkills") as string[];
    
    return [
    {
      id: "programming",
      title: skillCategoriesObj?.programming?.title || "编程语言",
      subtitle: skillCategoriesObj?.programming?.subtitle || "Programming Languages",
      icon: "💻",
      skills: ["Python", "SQL", "R"],
    },
    {
      id: "tools",
      title: skillCategoriesObj?.tools?.title || "工具",
      subtitle: skillCategoriesObj?.tools?.subtitle || "Tools",
      icon: "🛠️",
      skills: [
        "ChatGPT",
        "Claude",
        "Gemini",
        "Kimi.ai",
        "Python",
        "Tableau",
        "Figma",
        "Cursor",
        "React",
        "Tailwind",
        "GitHub",
        "Notion",
        "Git",
        "Excel",
      ],
    },
    {
      id: "business",
      title: skillCategoriesObj?.business?.title || "业务能力",
      subtitle: skillCategoriesObj?.business?.subtitle || "Business Skills",
      icon: "📊",
      skills: businessSkills,
    },
    ];
  }, [language, t]);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 pb-20" style={{ paddingBottom: 'calc(5rem - 2px)' }}>
      <h2 className="text-2xl font-bold mb-8 text-[#052659] dark:text-slate-100 transition-colors duration-300">
        {t("skills", "title")}
      </h2>
      <div className="space-y-8">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl border border-white/30 dark:border-slate-700/30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl shadow-lg p-6 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-[#052659] dark:text-slate-100">
                  {category.title}
                </h3>
                <p className="text-sm text-[#052659]/60 dark:text-slate-400">
                  {category.subtitle}
                </p>
              </div>
            </div>
            {category.id === "tools" ? (
              <div className="space-y-2">
                <div className="flex gap-8 items-center justify-start flex-col lg:flex-row">
                  <div className="flex-shrink-0">
                    <div className="relative w-[450px] h-[450px]">
                      <IconCloud images={toolLogos} />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-full max-w-[450px] h-[450px] flex items-center justify-center">
                      <VisitorCount />
                    </div>
                  </div>
                </div>
                {/* Horizontal scrolling tags below IconCloud */}
                <div className="w-full overflow-hidden relative">
                  <div 
                    className={`flex flex-row gap-2 text-sm ${prefersReducedMotion ? 'justify-center flex-wrap' : ''}`}
                    style={prefersReducedMotion ? {} : {
                      animation: 'scrollHorizontal 30s linear infinite',
                      animationPlayState: 'running',
                      width: 'max-content'
                    }}
                    onMouseEnter={(e) => {
                      if (!prefersReducedMotion) {
                        e.currentTarget.style.animationPlayState = 'paused';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!prefersReducedMotion) {
                        e.currentTarget.style.animationPlayState = 'running';
                      }
                    }}
                  >
                    {/* First set of tags */}
                    {category.skills.map((skill, index) => (
                      <span
                        key={`first-${index}`}
                        className="inline-flex rounded-xl border border-white/40 dark:border-slate-600/40 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm px-3 py-1 text-[#052659] dark:text-slate-200 transition-colors duration-300 whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {category.skills.map((skill, index) => (
                      <span
                        key={`second-${index}`}
                        className="inline-flex rounded-xl border border-white/40 dark:border-slate-600/40 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm px-3 py-1 text-[#052659] dark:text-slate-200 transition-colors duration-300 whitespace-nowrap"
                        aria-hidden="true"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 text-sm">
                {category.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-xl border border-white/40 dark:border-slate-600/40 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm px-3 py-1 text-[#052659] dark:text-slate-200 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

