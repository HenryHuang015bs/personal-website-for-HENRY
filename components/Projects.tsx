"use client";

import { useState, useMemo } from "react";
import ProjectModal from "./ProjectModal";
import { TextAnimate } from "@/components/ui/text-animate";
import { useLanguage } from "@/contexts/LanguageContext";

interface Project {
  title: string;
  emoji: string;
  subtitle: string;
  concept?: string;
  description: string;
  background?: string;
  process?: string;
  results?: string;
  reflection?: string;
  highlight?: string;
  keywords?: string;
}

export default function Projects() {
  const { language, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectCategories = useMemo(() => {
    const categories = t("projects", "categories") as any[];
    return categories || [];
  }, [language, t]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
    <section id="projects" className="mx-auto max-w-6xl px-4 pb-20" style={{ paddingBottom: 'calc(5rem - 2px)' }}>
        <h2 className="text-2xl font-bold mb-8 text-[#052659] dark:text-slate-100 transition-colors duration-300">{t("projects", "title")}</h2>
        <div className="space-y-12">
          {projectCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-[#052659] dark:text-slate-100 transition-colors duration-300">{category.title}</h3>
                  <p className="text-sm text-[#052659]/60 dark:text-slate-400 transition-colors duration-300">{category.subtitle}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.projects.map((project, index) => (
          <article
            key={index}
                    className="rounded-2xl border border-white/40 dark:border-slate-700/40 bg-white/15 dark:bg-slate-800/15 backdrop-blur-xl shadow-card-3d hover:shadow-card-3d-hover hover:bg-white/25 dark:hover:bg-slate-800/25 hover:border-white/50 dark:hover:border-slate-600/50 p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#052659] dark:text-slate-100 mb-1 transition-colors duration-300">{project.title}</h4>
                        <p className="text-xs text-[#052659]/70 dark:text-slate-300 mb-2 transition-colors duration-300">{project.subtitle}</p>
                      </div>
                    </div>
                    {project.concept && (
                      <p className="text-sm text-[#052659]/90 dark:text-slate-200 font-medium mb-2 italic transition-colors duration-300">
                        {project.concept}
                      </p>
                    )}
                    <p className="text-sm text-[#052659]/80 dark:text-slate-300 mb-3 transition-colors duration-300">{project.description}</p>
                    {project.highlight && (
                      <p className="text-xs text-[#052659]/90 dark:text-slate-200 mb-2 border-l-2 border-[#93C2E2] dark:border-slate-600 pl-2 transition-colors duration-300">
                        {t("projects", "highlight")}{project.highlight}
                      </p>
                    )}
                    {project.keywords && (
                      <p className="text-xs text-[#052659]/70 dark:text-slate-400 mb-3 transition-colors duration-300">
                        {t("projects", "keywords")}{project.keywords}
                      </p>
                    )}
                    <button
                      onClick={() => handleProjectClick(project)}
                      className="button-glass-liquid focus:outline-none"
                    >
                      <span className="relative z-20">
                        <TextAnimate>{t("projects", "learnMore")}</TextAnimate>
                      </span>
                    </button>
          </article>
                ))}
              </div>
            </div>
        ))}
      </div>
    </section>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

