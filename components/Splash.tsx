"use client";

import { useEffect, useState, useRef } from "react";

export default function Splash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let subtitleTimer: NodeJS.Timeout;
    let autoHideTimer: NodeJS.Timeout;
    let retryTimer: NodeJS.Timeout;
    let safetyTimer: NodeJS.Timeout;
    let isCleanedUp = false;

    // Lock scroll during splash
    try {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } catch (e) {
      // Silently fail
    }

    // Safety mechanism: ensure splash always disappears after 8 seconds
    safetyTimer = setTimeout(() => {
      if (isCleanedUp) return;
      setIsFading(true);
      setTimeout(() => {
        if (isCleanedUp) return;
        setIsVisible(false);
        try {
          document.body.style.overflow = "";
        } catch (e) {
          // Silently fail
        }
      }, 800);
    }, 8000);

    let handleMouseMove: ((e: MouseEvent) => void) | null = null;
    let handleClick: ((e: MouseEvent) => void) | null = null;
    let handleKeyDown: ((e: KeyboardEvent) => void) | null = null;
    let currentElement: HTMLDivElement | null = null;

    // Wait for refs to be ready
    const initializeSplash = () => {
      if (isCleanedUp) return;
      
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        if (isCleanedUp) return;
        
        if (!splashRef.current) {
          // If ref still not ready after delay, hide splash immediately
          setIsFading(true);
          setTimeout(() => {
            if (isCleanedUp) return;
            setIsVisible(false);
            try {
              document.body.style.overflow = "";
            } catch (e) {
              // Silently fail
            }
          }, 100);
          return;
        }
        
        currentElement = splashRef.current;

        // Generate particles
        if (particlesRef.current) {
          const count = 26;
          for (let i = 0; i < count; i++) {
            const particle = document.createElement("span");
            particle.className = `absolute rounded-full ${
              i % 3 === 0 ? "bg-[rgba(251,228,216,0.85)]" : "bg-[rgba(223,182,178,0.85)]"
            }`;
            particle.style.boxShadow = "0 0 10px rgba(133,79,108,0.55)";
            
            const size = 3 + Math.random() * 5; // 3-8px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const dx = (Math.random() * 24 - 12).toFixed(1);
            const dy = (Math.random() * 20 - 10).toFixed(1);
            particle.style.setProperty("--dx", `${dx}px`);
            particle.style.setProperty("--dy", `${dy}px`);
            
            const duration = (5 + Math.random() * 5).toFixed(1);
            particle.style.animation = `drift ${duration}s ease-in-out infinite alternate, twinkle 2.8s ease-in-out infinite`;
            particle.style.animationDelay = `${Math.random() * 1.5}s`;
            
            particlesRef.current.appendChild(particle);
          }
        }

        // Show subtitle after handwriting finishes (5.1s)
        subtitleTimer = setTimeout(() => {
          if (isCleanedUp) return;
          setSubtitleVisible(true);
        }, 5100);

        // Mouse move 3D effect
        handleMouseMove = (e: MouseEvent) => {
          if (!markRef.current) return;
          
          const rect = currentElement?.getBoundingClientRect();
          if (!rect) return;
          
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          const rx = py * -18; // rotateX
          const ry = px * 22; // rotateY
          markRef.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        };

        if (currentElement) {
          currentElement.addEventListener("mousemove", handleMouseMove, { passive: true });
        }

        // Define hideSplash function first
        const hideSplash = () => {
          if (isCleanedUp) return;
          if (autoHideTimer) {
            clearTimeout(autoHideTimer);
          }
          if (safetyTimer) {
            clearTimeout(safetyTimer);
          }
          setIsFading(true);
          setTimeout(() => {
            if (isCleanedUp) return;
            setIsVisible(false);
            try {
              document.body.style.overflow = "";
              window.scrollTo(0, 0);
            } catch (e) {
              // Silently fail
            }
          }, 800);
        };

        // Hide after 5s or on click
        autoHideTimer = setTimeout(() => {
          hideSplash();
        }, 5000);

        handleClick = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          hideSplash();
        };

        handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
            e.preventDefault();
            hideSplash();
          }
        };

        // Add event listeners to splash element
        if (currentElement) {
          currentElement.addEventListener("click", handleClick);
          currentElement.addEventListener("keydown", handleKeyDown);
          // Make it focusable for keyboard
          currentElement.setAttribute("tabIndex", "0");
          currentElement.setAttribute("role", "button");
          currentElement.setAttribute("aria-label", "跳过封面");
          currentElement.style.cursor = "pointer";
        }
      }, 100); // Small delay to ensure DOM is ready
    };

    // Start initialization
    initializeSplash();

    // Cleanup on unmount
    return () => {
      isCleanedUp = true;
      if (retryTimer) clearTimeout(retryTimer);
      if (subtitleTimer) clearTimeout(subtitleTimer);
      if (autoHideTimer) clearTimeout(autoHideTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      const element = currentElement || splashRef.current;
      if (element) {
        if (handleClick) {
          element.removeEventListener("click", handleClick);
        }
        if (handleKeyDown) {
          element.removeEventListener("keydown", handleKeyDown);
        }
        if (handleMouseMove) {
          element.removeEventListener("mousemove", handleMouseMove);
        }
      }
      try {
        document.body.style.overflow = "";
      } catch (e) {
        // Silently fail
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className={`fixed inset-0 grid place-items-center ${
        isFading ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"
      }`}
      style={{
        background: "radial-gradient(60% 60% at 50% 40%, #190019 0%, #2B124C 45%, #190019 100%)",
        transition: "opacity 0.8s ease, visibility 0.8s ease",
        zIndex: 9999,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-[10%] pointer-events-none"
        style={{
          background: `
            radial-gradient(42% 42% at 24% 32%, rgba(133,79,108,0.28), transparent 60%),
            radial-gradient(38% 38% at 78% 28%, rgba(82,43,91,0.22), transparent 60%),
            radial-gradient(34% 34% at 62% 76%, rgba(223,182,178,0.20), transparent 60%)
          `,
          filter: "blur(28px) saturate(120%)",
          mixBlendMode: "screen",
          animation: "glowFloat 9s ease-in-out infinite alternate",
        }}
      />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Content */}
      <div className="text-center relative z-10">
        <div ref={markRef} className="relative">
          <svg
            viewBox="0 0 1200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[min(86vw,1200px)] h-[200px]"
            style={{ minHeight: "200px" }}
          >
            <text
              x="600"
              y="140"
              textAnchor="middle"
              className="fill-transparent"
              style={{
                fontFamily: "var(--font-lavishly-yours), 'Brush Script MT', cursive",
                fontSize: "140px",
                fill: "transparent",
                stroke: "#FBE4D8",
                strokeWidth: "2.2px",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: 2000,
                strokeDashoffset: 2000,
                animation: "dashDraw 4.2s ease forwards, fillIn 0.9s ease forwards 4.2s",
              }}
            >
              Henry Huang
            </text>
          </svg>
        </div>
        <div
          className={`mt-6 text-sm uppercase tracking-wider text-[#DFB6B2] transition-opacity duration-600 ${
            subtitleVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ letterSpacing: "0.12em" }}
        >
          Data · Product · Growth
        </div>
      </div>
      
      {/* Click hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#DFB6B2] text-xs opacity-50 animate-pulse">
        点击或等待自动继续
      </div>
    </div>
  );
}
