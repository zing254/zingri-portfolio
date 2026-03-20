"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Terminal, Shield, Code2 } from "lucide-react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "ZINGRI MASTER";
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const titles = ["Full-Stack Developer", "DevOps Engineer", "Ethical Hacker"];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" />
      
      {/* Gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] bg-primary/20"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] bg-secondary/20"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] bg-accent/10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Particle canvas placeholder */}
      <canvas 
        id="particle-canvas" 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4"
      >
        {/* Terminal-style header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-lg glass border border-primary/30"
        >
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono text-primary/80">root@zingri:~# whoami</span>
        </motion.div>

        {/* Main title with typing effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black tracking-tight">
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
              {typedText}
            </span>
            <span 
              className={`inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary ml-2 align-middle transition-opacity duration-100 ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ boxShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)" }}
            />
          </h1>
        </motion.div>

        {/* Animated titles */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {titles.map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative px-6 py-2 rounded-full border border-primary/40 bg-surface/50 backdrop-blur-sm flex items-center gap-2">
                {i === 0 && <Code2 className="w-4 h-4 text-primary" />}
                {i === 1 && <Shield className="w-4 h-4 text-secondary" />}
                {i === 2 && <Terminal className="w-4 h-4 text-accent" />}
                <span className="font-mono text-sm md:text-base">{title}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-sm text-accent/80">Nairobi, Kenya 🇰🇪</span>
        </motion.div>

        {/* Decorative code snippet */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hidden lg:block absolute left-10 top-1/3 p-4 rounded-lg glass border border-primary/20 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-2 text-primary/60 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2">mission.js</span>
          </div>
          <pre className="font-mono text-xs text-primary/80">
            <code>
              {"const mission = {\n"}
              {"  target: 'excellence',\n"}
              {"  location: 'Nairobi',\n"}
              {"  status: 'ACTIVE'\n"}
              {"};"}
            </code>
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden lg:block absolute right-10 top-1/3 p-4 rounded-lg glass border border-secondary/20 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-2 text-secondary/60 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2">skills.log</span>
          </div>
          <pre className="font-mono text-xs text-secondary/80">
            <code>
              {"[✓] Next.js\n"}
              {"[✓] TypeScript\n"}
              {"[✓] AWS/Docker\n"}
              {"[✓] Security+"}
            </code>
          </pre>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono text-muted">scroll_down</span>
          <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-secondary/30 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-secondary/30 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 212, 255, 0.1) 2px,
            rgba(0, 212, 255, 0.1) 4px
          )`,
        }}
      />
    </section>
  );
}
