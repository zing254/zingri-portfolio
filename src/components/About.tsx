"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Calendar, Code2, Terminal, Shield, Rocket } from "lucide-react";

const stats = [
  { value: 3, suffix: "+", label: "Years Coding", icon: Code2, color: "primary" },
  { value: 10, suffix: "+", label: "Projects Shipped", icon: Rocket, color: "secondary" },
  { value: 4, suffix: "", label: "Companies", icon: MapPin, color: "accent" },
  { value: 50, suffix: "+", label: "Bugs Found", icon: Shield, color: "warning" },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg" />
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[150px] bg-secondary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: [0, 0, 1, 1] }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <span className="text-xs font-mono text-primary/80">cat about.txt</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent" 
               style={{ boxShadow: "0 0 20px var(--primary)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary via-secondary to-accent" />
              <div className="pl-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                  [BIO.DATA]
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="font-mono text-sm">
                    <span className="text-primary">$</span> echo $NAME
                    <br />
                    <span className="text-accent ml-4">Zingri Master</span>
                  </p>
                  <p>
                    I&apos;m a <span className="text-primary font-semibold">Full-Stack Developer</span>,{' '}
                    <span className="text-secondary font-semibold">DevOps Engineer</span>, and{' '}
                    <span className="text-accent font-semibold">Ethical Hacker</span> based in{' '}
                    <span className="text-warning">Nairobi, Kenya 🇰🇪</span>.
                  </p>
                  <p>
                    By day, I architect scalable systems and deploy bulletproof CI/CD pipelines. By night, 
                    I&apos;m hunting vulnerabilities and building tools that make the digital world safer. 
                    I believe in the power of open source and sharing knowledge.
                  </p>
                  <p>
                    Currently co-founding <span className="text-primary">Fleek Tech</span> and running{' '}
                    <span className="text-secondary">ZFT</span>. Previously at{' '}
                    <span className="text-muted">Telkom Kenya</span> as a Cybersecurity Intern.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick info cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass border border-primary/20 hover:border-primary/50 transition-colors group">
                <MapPin className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-muted">Location</p>
                <p className="font-semibold text-white">Nairobi, Kenya</p>
              </div>
              <div className="p-4 rounded-xl glass border border-secondary/20 hover:border-secondary/50 transition-colors group">
                <Calendar className="w-5 h-5 text-secondary mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-muted">Available for</p>
                <p className="font-semibold text-white">Freelance & Collab</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3 variants={itemVariants} className="font-heading text-2xl font-bold text-secondary">
              [STATS.DATA]
            </motion.h3>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    stat.color === 'primary' ? 'bg-primary/20' :
                    stat.color === 'secondary' ? 'bg-secondary/20' :
                    stat.color === 'accent' ? 'bg-accent/20' :
                    'bg-warning/20'
                  }`} />
                  
                  <div className="relative p-6 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all duration-300">
                    <stat.icon className={`w-8 h-8 mb-4 ${
                      stat.color === 'primary' ? 'text-primary' :
                      stat.color === 'secondary' ? 'text-secondary' :
                      stat.color === 'accent' ? 'text-accent' :
                      'text-warning'
                    }`} />
                    
                    <div className="font-heading text-4xl md:text-5xl font-black mb-2">
                      <span className={
                        stat.color === 'primary' ? 'text-primary glow-text-primary' :
                        stat.color === 'secondary' ? 'text-secondary glow-text-secondary' :
                        stat.color === 'accent' ? 'text-accent glow-text-accent' :
                        'text-warning'
                      }>
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted font-mono">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status bar */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 p-4 rounded-xl glass border border-accent/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono text-accent/80">system.status</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">mode:</span>
                  <span className="text-accent">always_learning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">coffee:</span>
                  <span className="text-warning">critical</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">bugs_fixed_today:</span>
                  <span className="text-primary">∞</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
