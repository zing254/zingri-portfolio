"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Monitor, Smartphone, Terminal, GitBranch, 
  Code, Zap, Shield, Cloud
} from "lucide-react";

const mobileSkills = [
  { name: "React Native", level: 90, years: 4 },
  { name: "Flutter", level: 80, years: 2 },
  { name: "Swift/iOS", level: 70, years: 3 },
  { name: "Kotlin/Android", level: 75, years: 3 },
  { name: "Redux/MobX", level: 85, years: 3 },
  { name: "REST/API Integration", level: 88, years: 4 },
  { name: "GraphQL", level: 70, years: 2 },
  { name: "Firebase", level: 80, years: 3 },
  { name: "Local Storage (SQLite/AsyncStorage)", level: 75, years: 3 },
  { name: "Push Notifications", level: 70, years: 2 },
  { name: "Mobile UI/UX Design", level: 85, years: 4 },
  { name: "Performance Optimization", level: 80, years: 3 },
  { name: "Testing (Jest, Detox, XCTest)", level: 75, years: 3 },
  { name: "CI/CD for Mobile (Fastlane, Bitrise)", level: 70, years: 2 },
];

const mobileProjects = [
  {
    id: 1,
    name: "Enterprise Field Service App",
    tagline: "Cross-Platform Mobile Solution for Technicians",
    description: "A comprehensive mobile application for field service technicians to manage work orders, inventory, and customer interactions in real-time, featuring offline capabilities and GPS tracking.",
    category: "Mobile",
    tech: ["React Native", "Redux", "React Navigation", "Node.js/Express", "PostgreSQL", "AWS", "Firebase"],
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
    icon: Smartphone,
    status: "Live",
    link: "https://example.com", // Replace with actual URL
    github: "https://github.com/username/repo", // Replace with actual URL
    stars: 120,
    featured: true
  },
  {
    id: 2,
    name: "Customer Loyalty & Rewards App",
    tagline: "Flutter-based Customer Engagement Platform",
    description: "A customer loyalty application built with Flutter that allows users to track points, redeem rewards, receive personalized offers, and engage with the brand through push notifications and social sharing.",
    category: "Mobile",
    tech: ["Flutter", "Provider", "Firebase Firestore", "Firebase Auth", "Firebase Cloud Messaging", "Stripe"],
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
    icon: Zap,
    status: "Live",
    link: "https://example.com", // Replace with actual URL
    github: "https://github.com/username/repo", // Replace with actual URL
    stars: 85,
    featured: true
  },
  {
    id: 3,
    name: "Internal Communication Tool",
    tagline: "Secure Team Communication Mobile App",
    description: "A secure internal communication platform for enterprise teams featuring encrypted messaging, file sharing, video conferencing integration, and push notifications, built with native iOS and Android modules.",
    category: "Mobile",
    tech: ["Swift", "Kotlin", "Room Database", "WebSocket", "MQTT", "AWS IoT"],
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
    icon: Shield,
    status: "Beta",
    link: "https://example.com", // Replace with actual URL
    github: "https://github.com/username/repo", // Replace with actual URL
    stars: 45,
    featured: false
  }
];

export default function Mobile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "iOS", "Android", "Cross-platform"];

  const filteredProjects = mobileProjects.filter(
    p => activeFilter === "All" || 
         (activeFilter === "iOS" && p.tech.some(t => ["Swift", "iOS"].includes(t))) ||
         (activeFilter === "Android" && p.tech.some(t => ["Kotlin", "Android"].includes(t))) ||
         (activeFilter === "Cross-platform" && p.tech.some(t => ["React Native", "Flutter"].includes(t)))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="mobile" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full blur-[180px] bg-secondary/5" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] rounded-full blur-[180px] bg-primary/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <span className="text-xs font-mono text-primary/80">npm list mobile --depth=0</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Mobile </span>
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
              Engineering
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Building exceptional mobile experiences across platforms with performance, security, and user-centric design.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-primary via-white to-secondary"
               style={{ boxShadow: "0 0 20px var(--primary)" }} />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 mr-4 text-muted">
            <Smartphone className="w-4 h-4" />
            <span className="text-xs font-mono">platform:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                relative px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
                ${activeFilter === category
                  ? 'bg-primary/20 text-primary border border-primary/50'
                  : 'glass border border-white/5 hover:border-white/20 text-muted hover:text-white'
                }
              `}
            >
              {category}
              {activeFilter === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="w-4 h-4 text-muted" />
            <span className="text-xs font-mono text-muted">MOBILE_TECH_STACK</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mobileSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <Monitor className={`w-5 h-5 text-primary`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white">{skill.name}</h3>
                    <p className="text-xs text-muted">{skill.level}% • {skill.years}y</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`h-full rounded-full relative bg-gradient-to-r from-primary to-cyan-300`}
                    style={{ 
                      boxShadow: `0 0 10px var(--primary)` 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                project.color === 'primary' ? 'bg-primary/20' :
                project.color === 'secondary' ? 'bg-secondary/20' :
                project.color === 'accent' ? 'bg-accent/20' :
                'bg-warning/20'
              }`} />

              <div className={`
                relative h-full p-6 rounded-2xl glass border overflow-hidden
                transition-all duration-500
                ${hoveredId === project.id ? 'border-primary/50 scale-[1.02]' : 'border-white/5'}
              `}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      project.color === 'primary' ? 'bg-primary/10' :
                      project.color === 'secondary' ? 'bg-secondary/10' :
                      project.color === 'accent' ? 'bg-accent/10' :
                      'bg-warning/10'
                    }`}>
                      <project.icon className={`w-6 h-6 ${
                        project.color === 'primary' ? 'text-primary' :
                        project.color === 'secondary' ? 'text-secondary' :
                        project.color === 'accent' ? 'text-accent' :
                        'text-warning'
                      }`} />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1 text-xs text-warning">
                          <Star className="w-3 h-3 fill-warning" />
                          <span className="font-mono">{project.stars}</span>
                        </div>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        project.status === 'Live' ? 'bg-accent/10 text-accent' :
                        project.status === 'Beta' ? 'bg-warning/10 text-warning' :
                        'bg-muted/10 text-muted'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono mb-3" style={{
                    color: project.color === 'primary' ? 'var(--primary)' :
                           project.color === 'secondary' ? 'var(--secondary)' :
                           project.color === 'accent' ? 'var(--accent)' :
                           'var(--warning)'
                  }}>
                    {project.tagline}
                  </p>
                  <p className="text-sm text-gray-400 mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded text-xs font-mono glass border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 rounded text-xs font-mono text-muted">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm font-mono transition-colors ${
                        project.color === 'primary' ? 'text-primary hover:text-primary/80' :
                        project.color === 'secondary' ? 'text-secondary hover:text-secondary/80' :
                        project.color === 'accent' ? 'text-accent hover:text-accent/80' :
                        'text-warning hover:text-warning/80'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-muted hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                    
                    <div className="flex-grow" />
                    
                    <motion.div
                      animate{{ x: hoveredId === project.id ? 0 : 4 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center gap-1 text-sm font-mono ${
                        project.color === 'primary' ? 'text-primary' :
                        project.color === 'secondary' ? 'text-secondary' :
                        project.color === 'accent' ? 'text-accent' :
                        'text-warning'
                      }`}
                    >
                      <span className="text-xs">View</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="px-2 py-1 rounded bg-warning/10 border border-warning/30">
                        <span className="text-xs font-mono text-warning">Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Corner decoration */}
                  <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl ${
                    project.color === 'primary' ? 'border-primary/20' :
                    project.color === 'secondary' ? 'border-secondary/20' :
                    project.color === 'accent' ? 'border-accent/20' :
                    'border-warning/20'
                  }`} />
                </div>
              </div>
              </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl glass border border-primary/20">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="text-muted font-mono text-sm">More mobile projects on GitHub</span>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-colors"
            >
              View All →
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}