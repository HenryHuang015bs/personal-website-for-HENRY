import type { Metadata } from "next";
import "./globals.css";
import StagewiseInit from "@/components/StagewiseInit";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Henry Huang - Personal Website",
  description: "Data & Strategy Explorer | Economics & Data Science Student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <StagewiseInit />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

