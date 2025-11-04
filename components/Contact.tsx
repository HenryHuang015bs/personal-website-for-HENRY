"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-20" style={{ paddingBottom: 'calc(5rem - 2px)' }}>
      <div className="rounded-3xl border border-white/30 dark:border-slate-700/30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-[#052659] dark:text-slate-100">
          {t("contact", "title")}
        </h2>
        <p className="text-[#052659]/80 dark:text-slate-300">
          {t("contact", "description")}
        </p>
      </div>
    </section>
  );
}

