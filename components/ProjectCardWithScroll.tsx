"use client";

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

interface ProjectCardWithScrollProps {
  project: Project;
  onClick?: () => void;
}

/**
 * 卡片内滚动版本 - 不弹窗，详细区域用 max-h-64 overflow-y-auto
 * 这是一个可选的实现，适用于不需要弹窗的场景
 */
export default function ProjectCardWithScroll({ project, onClick }: ProjectCardWithScrollProps) {
  return (
    <article
      className="rounded-2xl border border-white/40 bg-white/15 backdrop-blur-xl shadow-card-3d hover:shadow-card-3d-hover hover:bg-white/25 hover:border-white/50 p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex flex-col"
      onClick={onClick}
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="text-lg">{project.emoji}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-[#052659] mb-1">{project.title}</h4>
          <p className="text-xs text-[#052659]/70 mb-2">{project.subtitle}</p>
        </div>
      </div>
      
      {project.concept && (
        <p className="text-sm text-[#052659]/90 font-medium mb-2 italic">
          {project.concept}
        </p>
      )}
      
      <p className="text-sm text-[#052659]/80 mb-3">{project.description}</p>
      
      {project.highlight && (
        <p className="text-xs text-[#052659]/90 mb-2 border-l-2 border-[#93C2E2] pl-2">
          展示亮点：{project.highlight}
        </p>
      )}
      
      {/* 详细区域 - 卡片内滚动 */}
      <div className="mt-3 max-h-64 overflow-y-auto overscroll-contain scrollbar-thin space-y-3">
        {project.background && (
          <div>
            <h5 className="text-xs font-semibold text-[#052659] mb-1">项目背景</h5>
            <p className="text-xs text-[#052659]/80 leading-relaxed whitespace-pre-line">{project.background}</p>
          </div>
        )}

        {project.process && (
          <div>
            <h5 className="text-xs font-semibold text-[#052659] mb-1">工作过程</h5>
            <p className="text-xs text-[#052659]/80 leading-relaxed whitespace-pre-line">{project.process}</p>
          </div>
        )}

        {project.results && (
          <div>
            <h5 className="text-xs font-semibold text-[#052659] mb-1">成果展示</h5>
            <p className="text-xs text-[#052659]/80 leading-relaxed whitespace-pre-line">{project.results}</p>
          </div>
        )}

        {project.reflection && (
          <div>
            <h5 className="text-xs font-semibold text-[#052659] mb-1">收获反思</h5>
            <p className="text-xs text-[#052659]/80 leading-relaxed whitespace-pre-line">{project.reflection}</p>
          </div>
        )}

        {project.keywords && (
          <div>
            <h5 className="text-xs font-semibold text-[#052659] mb-2">关键词</h5>
            <div className="flex flex-wrap gap-2">
              {project.keywords.split(" · ").map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-xl border border-[#93C2E2]/40 bg-[#C8E3F5]/20 backdrop-blur-sm px-3 py-1 text-xs text-[#052659]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

