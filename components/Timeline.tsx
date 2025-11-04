"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineItem {
  emoji?: string;
  period: string;
  title: string;
  subtitle?: string;
  background?: string;
  details?: string[];
  research?: {
    topic?: string;
    paper?: string;
  };
  keywords?: string;
}

export default function Timeline() {
  const { t } = useLanguage();
  const timelineItems = t("timeline", "items") as TimelineItem[];
  const labels = t("timeline", "labels") as {
    background: string;
    researchTopic: string;
    researchPaper: string;
    keywords: string;
  };

  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 使用 Intersection Observer 实现进入视口动画
  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, [timelineItems]);

  // 鼠标移动跟踪，实现3D倾斜效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current) return;
      
      const rect = carouselRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 到 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 到 1
      
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("mousemove", handleMouseMove);
      carousel.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("mousemove", handleMouseMove);
        carousel.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // 键盘导航
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [timelineItems.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const hasExpandableContent = (item: TimelineItem) => {
    return !!(
      item.background ||
      (item.details && item.details.length > 0) ||
      item.research ||
      item.keywords
    );
  };

  // 计算卡片位置和样式 - 横轴切片设计
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);
    const isHovered = hoveredIndex === index;
    
    // 横轴切片布局：卡片水平排列，不使用深度旋转
    // 基础间距约380px，距离越远间距稍微增大
    const baseSpacing = 380;
    const translateX = diff * (baseSpacing + absDiff * 15);
    const scale = isHovered ? 1.05 : (absDiff === 0 ? 1 : Math.max(0.75, 0.9 - absDiff * 0.08)); // 当前卡片最大，其他缩小
    // 悬停时完全不透明，否则根据距离调整
    const opacity = isHovered ? 1 : (absDiff > 2 ? 0.25 : Math.max(0.3, 1 - absDiff * 0.25));
    // zIndex：索引越小（越靠前）zIndex越大，确保前面的卡片不会被后面的遮挡
    const zIndex = isHovered ? timelineItems.length + 10 : (timelineItems.length - index);

    // 鼠标悬停时的3D倾斜效果（仅对当前卡片和悬停卡片）
    let additionalRotateX = 0;
    let additionalRotateY = 0;
    
    if ((diff === 0 || isHovered) && mousePosition) {
      additionalRotateX = mousePosition.y * 8; // 根据鼠标Y位置轻微倾斜
      additionalRotateY = mousePosition.x * 8; // 根据鼠标X位置轻微倾斜
    }

    // 轻微的Y轴旋转，增强立体感（但不遮挡）
    const rotateY = diff * 2; // 非常小的旋转角度，仅2度，不遮挡

    return {
      transform: `perspective(1000px) rotateY(${rotateY + additionalRotateY}deg) rotateX(${additionalRotateX}deg) translateX(${translateX}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      pointerEvents: absDiff > 2 && !isHovered ? "none" as const : "auto" as const,
    };
  };

  return (
    <section
      id="timeline"
      className="mx-auto max-w-7xl px-4 pb-20"
      style={{ paddingBottom: "calc(5rem - 2px)" }}
    >
      <div className="rounded-3xl border border-white/30 dark:border-slate-700/30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl shadow-lg p-8 transition-colors duration-300 relative overflow-hidden">
        {/* 背景流光效果 */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#052659]/5 to-transparent dark:via-slate-400/5 animate-shimmer"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-8 text-[#052659] dark:text-slate-100">
            {t("timeline", "title")}
          </h2>

          {/* 横轴切片容器 */}
          <div
            ref={carouselRef}
            className="relative h-[550px] md:h-[650px] lg:h-[700px] overflow-x-hidden overflow-y-visible"
          >
            <div className="absolute inset-0 flex items-center justify-center"
                 style={{ 
                   width: '100%'
                 }}
            >
              {timelineItems.map((item, index) => {
                const isExpanded = expandedItems.has(index);
                const isVisible = visibleItems.has(index);
                const hasExpandable = hasExpandableContent(item);
                const cardStyle = getCardStyle(index);

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="absolute w-full max-w-md transition-all duration-700 ease-out"
                    style={{
                      ...cardStyle,
                      transformOrigin: "center center",
                    }}
                    onTransitionEnd={() => {
                      if (isVisible) return;
                      // 当卡片进入视口时触发动画
                      const rect = itemRefs.current[index]?.getBoundingClientRect();
                      if (rect && rect.top < window.innerHeight) {
                        setVisibleItems((prev) => new Set([...prev, index]));
                      }
                    }}
                  >
                    {/* 卡片容器 */}
                    <div 
                      className="group cursor-pointer h-full" 
                      onClick={() => hasExpandable && toggleExpand(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div
                        className={`relative rounded-2xl border transition-all duration-500 h-full flex flex-col ${
                          hoveredIndex === index
                            ? "border-[#052659]/60 dark:border-slate-400/60 bg-[#052659]/15 dark:bg-slate-800/50 shadow-timeline-light-hover dark:shadow-timeline-light-dark-hover"
                            : isExpanded
                            ? "border-[#052659]/40 dark:border-slate-400/40 bg-[#052659]/10 dark:bg-slate-800/30 shadow-timeline-light dark:shadow-timeline-light-dark"
                            : "border-white/30 dark:border-slate-700/30 bg-white/20 dark:bg-slate-900/30 hover:border-[#052659]/50 dark:hover:border-slate-400/50 hover:bg-[#052659]/10 dark:hover:bg-slate-800/40 shadow-timeline-light dark:shadow-timeline-light-dark hover:shadow-timeline-light-hover dark:hover:shadow-timeline-light-dark-hover"
                        } p-6 md:p-8 overflow-hidden`}
                        style={{
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        {/* 边缘光源效果 - 顶部和左侧高光 */}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                          {/* 顶部光源 */}
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent opacity-60 dark:opacity-40"></div>
                          {/* 左侧光源 */}
                          <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-gradient-to-r from-white/25 via-white/8 to-transparent dark:from-white/12 dark:via-white/4 dark:to-transparent opacity-50 dark:opacity-30"></div>
                          {/* 边缘光晕 */}
                          <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-slate-400/20 shadow-[0_0_20px_rgba(5,38,89,0.2),inset_0_0_20px_rgba(255,255,255,0.1)] dark:shadow-[0_0_20px_rgba(148,163,184,0.15),inset_0_0_20px_rgba(255,255,255,0.05)]"></div>
                        </div>
                        {/* 卡片内流光效果 */}
                        {isExpanded && (
                          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#052659]/15 to-transparent dark:via-slate-400/15 animate-shimmer-fast"></div>
                          </div>
                        )}

                        {/* 卡片背景光晕 */}
                        {(index === currentIndex || hoveredIndex === index) && (
                          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <div 
                              className={`absolute inset-0 hidden dark:block ${
                                hoveredIndex === index ? 'animate-pulse' : 'animate-pulse'
                              }`}
                              style={{
                                background: hoveredIndex === index 
                                  ? 'radial-gradient(circle at center, rgba(148, 163, 184, 0.2) 0%, transparent 70%)'
                                  : 'radial-gradient(circle at center, rgba(148, 163, 184, 0.1) 0%, transparent 70%)'
                              }}
                            ></div>
                            <div 
                              className={`absolute inset-0 dark:hidden ${
                                hoveredIndex === index ? 'animate-pulse' : 'animate-pulse'
                              }`}
                              style={{
                                background: hoveredIndex === index
                                  ? 'radial-gradient(circle at center, rgba(5, 38, 89, 0.2) 0%, transparent 70%)'
                                  : 'radial-gradient(circle at center, rgba(5, 38, 89, 0.1) 0%, transparent 70%)'
                              }}
                            ></div>
                          </div>
                        )}

                        <div className="relative z-10 space-y-4 flex-1 flex flex-col">
                          {/* Emoji和Period */}
                          <div className="flex items-center gap-4">
                            {item.emoji && (
                              <div className="text-4xl animate-card-rotate">
                                {item.emoji}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-[#052659]/70 dark:text-slate-400 mb-1 transition-colors duration-300">
                                {item.period}
                              </p>
                            </div>
                          </div>

                          {/* 标题区域 */}
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#052659] dark:text-slate-200 transition-colors duration-300 group-hover:text-[#052659] dark:group-hover:text-slate-100 mb-2">
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p className="text-lg text-[#052659]/80 dark:text-slate-300 mt-2 transition-colors duration-300">
                                {item.subtitle}
                              </p>
                            )}
                          </div>

                          {/* 可展开内容 */}
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isExpanded
                                ? "max-h-[300px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="space-y-4 pt-4 border-t border-[#052659]/20 dark:border-slate-700/40">
                              {item.background && (
                                <p className="text-sm text-[#052659]/70 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                                  <span className="font-medium">{labels.background}</span>
                                  {item.background}
                                </p>
                              )}

                              {item.details && item.details.length > 0 && (
                                <ul className="space-y-2">
                                  {item.details.map((detail, detailIndex) => (
                                    <li
                                      key={detailIndex}
                                      className="text-sm text-[#052659]/70 dark:text-slate-400 leading-relaxed transition-colors duration-300 flex items-start gap-2"
                                    >
                                      <span className="text-[#052659]/50 dark:text-slate-500 mt-1">▸</span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {item.research && (
                                <div className="space-y-2 pt-2">
                                  {item.research.topic && (
                                    <p className="text-sm text-[#052659]/70 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                                      <span className="font-medium">{labels.researchTopic}</span>
                                      {item.research.topic}
                                    </p>
                                  )}
                                  {item.research.paper && (
                                    <p className="text-sm text-[#052659]/70 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                                      <span className="font-medium">{labels.researchPaper}</span>
                                      {item.research.paper}
                                    </p>
                                  )}
                                </div>
                              )}

                              {item.keywords && (
                                <div className="pt-2">
                                  <p className="text-sm text-[#052659]/70 dark:text-slate-400 transition-colors duration-300">
                                    <span className="font-medium">{labels.keywords}</span>
                                    {item.keywords}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 展开/收起按钮 */}
                          {hasExpandable && (
                            <button
                              className={`self-end flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isExpanded
                                  ? "bg-[#052659]/20 dark:bg-slate-700/40 text-[#052659] dark:text-slate-300 rotate-180"
                                  : "bg-white/60 dark:bg-slate-700/40 text-[#052659]/70 dark:text-slate-400 hover:bg-[#052659]/20 dark:hover:bg-slate-600/40"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(index);
                              }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white/20 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30 flex items-center justify-center text-[#052659] dark:text-slate-300 hover:bg-[#052659]/10 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* 卡片指示器 */}
            <div className="flex gap-2">
              {timelineItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 h-3 bg-[#052659] dark:bg-slate-400"
                      : "w-3 h-3 bg-[#052659]/30 dark:bg-slate-600/30 hover:bg-[#052659]/50 dark:hover:bg-slate-500/50"
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/20 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30 flex items-center justify-center text-[#052659] dark:text-slate-300 hover:bg-[#052659]/10 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* 卡片计数器 */}
          <div className="text-center mt-4 text-sm text-[#052659]/60 dark:text-slate-400">
            {currentIndex + 1} / {timelineItems.length}
          </div>
        </div>
      </div>
    </section>
  );
}

