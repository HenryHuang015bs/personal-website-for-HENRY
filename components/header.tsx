import Link from "next/link"

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-background/80 backdrop-blur-sm">
      <Link href="/" className="text-xl font-semibold text-foreground hover:opacity-70 transition-opacity">
        HenryHuang.
      </Link>

      <nav className="flex items-center gap-6 md:gap-8">
        <Link href="/" className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors">
          About
        </Link>
        <Link
          href="/skills"
          className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
        >
          Skills
        </Link>
        <Link
          href="/portfolio"
          className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
        >
          Portfolio
        </Link>
        <Link
          href="/contact"
          className="text-sm md:text-base text-foreground/80 hover:text-foreground transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}
