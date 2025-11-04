import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";
import FluidBackground from "@/components/FluidBackground";
import LanguageHtml from "@/components/LanguageHtml";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[hsl(35,67%,95%)] dark:bg-[hsl(222,47%,11%)]">
      <LanguageHtml />
      <FluidBackground />
      {/* <Splash /> */}
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}

