"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate(${position.x - (isHovering ? 20 : 8)}px, ${position.y - (isHovering ? 20 : 8)}px)`,
      }}
    >
      {isHovering ? (
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
          <Terminal className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-white" />
      )}
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[9999]"
        style={{ width: progressWidth }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? "glass border-b border-white/10" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-heading font-black text-black text-lg">Z</span>
              </div>
              <span className="font-heading font-bold text-lg hidden sm:block">
                <span className="text-primary">ZING</span>
                <span className="text-white">RI</span>
              </span>
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 rounded-lg text-sm font-mono text-muted hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-mono text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Hire Me
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden glass border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-mono text-muted hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full mt-4 px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-mono text-sm font-semibold"
            >
              Hire Me
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Main content */}
      <div className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-heading font-black text-black text-lg">Z</span>
              </div>
              <div>
                <p className="font-heading font-bold text-white">
                  ZINGRI <span className="text-primary">MASTER</span>
                </p>
                <p className="text-xs text-muted font-mono">Full-Stack Developer & Ethical Hacker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted font-mono">
              <span>© 2024 Zingri Master</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with 💀 in Nairobi 🇰🇪</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Noise overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </main>
  );
}
