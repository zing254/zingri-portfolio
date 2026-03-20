"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  ExternalLink, Github, Star, Filter, 
  Terminal, ArrowRight, Sparkles, Shield, 
  Briefcase, Rocket, Code2
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Shadow AI",
    tagline: "AI-Powered Security Platform",
    description: "An advanced AI platform for threat detection and vulnerability analysis. Uses machine learning to identify and mitigate security risks in real-time.",
    category: "AI/ML",
    tech: ["Python", "LangChain", "TensorFlow", "FastAPI", "React"],
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
    icon: Sparkles,
    status: "Live",
    link: "#",
    github: "#",
    stars: 45,
    featured: true
  },
  {
    id: 2,
    name: "Kenya Overwatch",
    tagline: "Network Monitoring System",
    description: "A comprehensive network monitoring and alerting system designed for Kenyan infrastructure. Tracks uptime, performance, and security events.",
    category: "DevOps",
    tech: ["Python", "Docker", "Prometheus", "Grafana", "Ansible"],
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
    icon: Shield,
    status: "Live",
    link: "#",
    github: "#",
    stars: 32,
    featured: true
  },
  {
    id: 3,
    name: "Dept Collector",
    tagline: "Financial Automation Tool",
    description: "Automated debt collection system with smart reminder scheduling, payment tracking, and customer communication management.",
    category: "Backend",
    tech: ["Node.js", "PostgreSQL", "Redis", "Twilio", "React"],
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
    icon: Briefcase,
    status: "Live",
    link: "#",
    github: "#",
    stars: 28,
    featured: false
  },
  {
    id: 4,
    name: "Z-Office",
    tagline: "Productivity Suite",
    description: "A lightweight, browser-based office suite with real-time collaboration. Includes documents, spreadsheets, and presentation tools.",
    category: "Frontend",
    tech: ["Next.js", "TypeScript", "Tiptap", "Supabase", "Tailwind"],
    color: "warning",
    gradient: "from-warning/20 to-warning/5",
    icon: Code2,
    status: "Beta",
    link: "#",
    github: "#",
    stars: 19,
    featured: false
  },
  {
    id: 5,
    name: "fleektech.co.ke",
    tagline: "Company Website",
    description: "Modern, performant website for Fleek Tech featuring smooth animations, dark mode, and optimized SEO.",
    category: "Frontend",
    tech: ["Next.js", "Framer Motion", "TailwindCSS", "Vercel"],
    color: "primary",
    gradient: "from-primary/20 to-secondary/5",
    icon: Rocket,
    status: "Live",
    link: "https://fleektech.co.ke",
    github: "#",
    stars: 0,
    featured: true
  },
  {
    id: 6,
    name: "stariz.b12sites.com",
    tagline: "Portfolio Showcase",
    description: "Creative portfolio website with immersive 3D effects, particle animations, and unique visual storytelling.",
    category: "Frontend",
    tech: ["React", "Three.js", "GSAP", "Styled Components"],
    color: "secondary",
    gradient: "from-secondary/20 to-accent/5",
    icon: Star,
    status: "Live",
    link: "https://stariz.b12sites.com",
    github: "#",
    stars: 0,
    featured: false
  }
];

const categories = ["All", "Frontend", "Backend", "DevOps", "AI/ML"];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = projects.filter(
    p => activeFilter === "All" || p.category === activeFilter
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
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-warning/30 mb-6">
            <span className="text-xs font-mono text-warning/80">ls -la ./projects/</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-warning to-secondary">
              Projects
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Products that ship. Problems that solve. From AI security tools to productivity suites.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-primary via-warning to-secondary"
               style={{ boxShadow: "0 0 20px var(--warning)" }} />
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
            <Filter className="w-4 h-4" />
            <span className="text-xs font-mono">filter:</span>
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
                      animate={{ x: hoveredId === project.id ? 0 : 4 }}
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
            <span className="text-muted font-mono text-sm">More projects on GitHub</span>
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warning/50 to-transparent" />
    </section>
  );
}
