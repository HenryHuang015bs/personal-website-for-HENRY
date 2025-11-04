"use client";

import { useEffect, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  children: ReactNode;
  className?: string;
}

export function Terminal({ children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/30 dark:border-slate-700/30 bg-[#1e1e1e] dark:bg-slate-900/95 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 dark:border-slate-700/30 bg-[#2d2d2d] dark:bg-slate-800/50 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-slate-400 ml-2">Terminal</span>
      </div>
      <div className="p-4 font-mono text-sm text-slate-300 dark:text-slate-200 leading-relaxed flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

interface TypingAnimationProps {
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingAnimation({
  children,
  className,
  speed = 50,
  delay = 0,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted && delay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }

    if (!hasStarted && delay === 0) {
      setHasStarted(true);
    }

    if (hasStarted && displayText.length < children.length) {
      const timeout = setTimeout(() => {
        setDisplayText(children.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (hasStarted && displayText.length === children.length) {
      setIsComplete(true);
    }
  }, [displayText, children, speed, delay, hasStarted]);

  if (!hasStarted) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span>{displayText}</span>
      {!isComplete && (
        <span className="animate-pulse text-slate-400">▊</span>
      )}
    </div>
  );
}

interface AnimatedSpanProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSpan({
  children,
  className,
  delay = 200,
}: AnimatedSpanProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "opacity-0 transition-opacity duration-300",
        isVisible && "opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}

