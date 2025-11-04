import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const roles = ["Data & Strategy Explorer", "Full Stack Developer", "AI Enthusiast", "Problem Solver"]

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section className="flex items-center justify-center min-h-screen px-8 md:px-16 pt-24">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6">
          <p className="text-sm md:text-base text-foreground/60">Hello, it&apos;s me</p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Call Me Henry</h1>

          <div className="h-8 md:h-10">
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80">
              And I&apos;m a <span className="text-primary font-semibold">{displayText}</span>
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="text-sm md:text-base text-foreground/70 max-w-lg leading-relaxed">
            I turn data into decisions and ideas into impact. Passionate about leveraging technology to solve complex
            problems and create meaningful experiences.
          </p>

          {/* Social media icons */}
          <div className="flex items-center gap-4 pt-4">
            <Link
              href="https://tiktok.com"
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:border-foreground hover:bg-foreground/10 hover:scale-110 active:scale-95 transition-all duration-300 transform-gpu hover:rotate-6 group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:border-foreground hover:bg-foreground/10 hover:scale-110 active:scale-95 transition-all duration-300 transform-gpu hover:rotate-6 group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:border-foreground hover:bg-foreground/10 hover:scale-110 active:scale-95 transition-all duration-300 transform-gpu hover:rotate-6 group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>

            <Link
              href="https://wechat.com"
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:border-foreground hover:bg-foreground/10 hover:scale-110 active:scale-95 transition-all duration-300 transform-gpu hover:rotate-6 group"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
              </svg>
            </Link>
          </div>

          {/* Download CV button with glassmorphism */}
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-foreground/10 backdrop-blur-md border border-foreground/20 hover:bg-foreground/20 text-foreground shadow-lg hover:shadow-xl hover:shadow-foreground/20 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/20 to-foreground/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12 relative z-10" />
              <span className="relative z-10">Download CV</span>
            </Button>
          </div>
        </div>

        {/* Right side - Profile image */}
        <div className="flex items-center justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-foreground/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z9PeyLwHMAzHkjnTXZOSY4oqVMME8A.png"
                alt="Henry Huang"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
