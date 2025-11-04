"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function FluidBackground() {
  const { theme } = useTheme();
  
  const lightBackground = `
    radial-gradient(40% 40% at 20% 20%, rgba(82,43,91,0.25), transparent 60%),
    radial-gradient(40% 40% at 80% 10%, rgba(133,79,108,0.20), transparent 60%),
    radial-gradient(35% 35% at 60% 80%, rgba(223,182,178,0.18), transparent 60%),
    linear-gradient(45deg, #F5F7FA 0%, #ffffff 100%)
  `;
  
  const darkBackground = `
    radial-gradient(40% 40% at 20% 20%, rgba(82,43,91,0.15), transparent 60%),
    radial-gradient(40% 40% at 80% 10%, rgba(133,79,108,0.10), transparent 60%),
    radial-gradient(35% 35% at 60% 80%, rgba(56,189,248,0.08), transparent 60%),
    linear-gradient(45deg, hsl(222, 47%, 11%) 0%, hsl(222, 47%, 13%) 100%)
  `;
  
  return (
    <div
      className="fixed -inset-[20%_-10%_-10%_-10%] -z-10 animate-flow"
      style={{
        background: theme === "dark" ? darkBackground : lightBackground,
      }}
    />
  );
}
