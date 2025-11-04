"use client";

import { useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
  title: string;
  emoji?: string;
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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language, t } = useLanguage();
  const modalLabels = useMemo(() => {
    return t("projects", "modalLabels") as any;
  }, [language, t]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[80vh] rounded-3xl border border-white/40 dark:border-slate-700/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-4 border-b border-white/30 dark:border-slate-700/30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shrink-0 transition-colors duration-300">
          <div className="flex-1 pr-8">
            <h2 className="text-3xl font-bold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{project.title}</h2>
            <p className="text-lg text-[#052659]/70 dark:text-slate-300 transition-colors duration-300">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#052659]/70 dark:text-slate-300 hover:text-[#052659] dark:hover:text-slate-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#052659]/40 dark:focus-visible:ring-slate-400/40 rounded-full p-2 hover:bg-white/50 dark:hover:bg-slate-800/50"
            aria-label={t("common", "close")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin">
          <div className="p-6 space-y-6">
            {project.concept && (
              <p className="text-xl text-[#052659]/90 dark:text-slate-200 font-medium italic border-l-4 border-[#93C2E2] dark:border-slate-600 pl-4 py-2 transition-colors duration-300">
                {project.concept}
              </p>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.description}</h3>
                <p className="text-base text-[#052659]/80 dark:text-slate-300 leading-relaxed transition-colors duration-300">{project.description}</p>
              </div>

              {project.background && (
                <div>
                  <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.background}</h3>
                  <p className="text-base text-[#052659]/80 dark:text-slate-300 leading-relaxed whitespace-pre-line transition-colors duration-300">{project.background}</p>
                </div>
              )}

              {project.process && (
                <div>
                  <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.process}</h3>
                  <p className="text-base text-[#052659]/80 dark:text-slate-300 leading-relaxed whitespace-pre-line transition-colors duration-300">{project.process}</p>
                </div>
              )}

              {project.results && (
                <div>
                  <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.results}</h3>
                  <p className="text-base text-[#052659]/80 dark:text-slate-300 leading-relaxed whitespace-pre-line transition-colors duration-300">{project.results}</p>
                </div>
              )}

              {project.reflection && (
                <div>
                  <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.reflection}</h3>
                  <p className="text-base text-[#052659]/80 dark:text-slate-300 leading-relaxed whitespace-pre-line transition-colors duration-300">{project.reflection}</p>
                </div>
              )}

              {project.highlight && (
                <div>
                  <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.highlight}</h3>
                  <p className="text-base text-[#052659]/80 dark:text-slate-300 leading-relaxed transition-colors duration-300">{project.highlight}</p>
                </div>
              )}

              {project.keywords && (
                <div>
                  <h3 className="text-lg font-semibold text-[#052659] dark:text-slate-100 mb-2 transition-colors duration-300">{modalLabels?.keywords}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.keywords.split(" · ").map((keyword, index) => (
                      <span
                        key={index}
                        className="rounded-xl border border-[#93C2E2]/40 dark:border-slate-600/40 bg-[#C8E3F5]/20 dark:bg-slate-800/20 backdrop-blur-sm px-4 py-2 text-sm text-[#052659] dark:text-slate-200 transition-colors duration-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

