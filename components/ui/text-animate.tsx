"use client";

import { cn } from "@/lib/utils";

type TextAnimateProps = {
  children: string;
  className?: string;
  animationType?: "wave" | "fade" | "slide";
  delay?: number;
};

export function TextAnimate({
  children,
  className,
  animationType = "wave",
  delay = 0.05,
}: TextAnimateProps) {
  const chars = children.split("");

  const getAnimationClass = (index: number) => {
    const baseClasses = "inline-block";

    switch (animationType) {
      case "fade":
        return cn(
          baseClasses,
          "opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards]"
        );
      case "slide":
        return cn(
          baseClasses,
          "opacity-0 translate-y-2 animate-[slideUpFade_0.5s_ease-out_forwards]"
        );
      case "wave":
      default:
        return cn(
          baseClasses,
          "opacity-0 translate-y-1 animate-[waveFade_0.6s_ease-in-out_forwards]"
        );
    }
  };

  return (
    <span className={cn("inline-block", className)}>
      {chars.map((char, index) => (
        <span
          key={`${index}-${char}`}
          className={cn(getAnimationClass(index))}
          style={{
            animationDelay: `${index * delay}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

