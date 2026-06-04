"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  GitBranch, Terminal, Star, ExternalLink, 
  Code, Zap, Shield, Monitor, Award, 
  Code2, Cloud, Brain
} from "lucide-react";

const openSourceMetrics = [
  { label: "Public Repos", value: "15+", icon: GitBranch },
  { label: "Total Stars", value: "1.2K+", icon: Star },
  { label: "Contributions", value: "500+", icon: Code },
  { label: "Followers", value: "800+", icon: Award },
];

const notableProjects = [
  {
    id: 1,
    name: "Shadow AI Security Engine",
    description: "An open-source AI-powered security platform for threat detection and vulnerability analysis using machine learning to identify and mitigate security risks in real-time.",
    category: "AI/ML Security",
    tech: ["Python", "LangChain", "TensorFlow", "FastAPI", "React"],
    stars: 240,
    forks: 35,
    language: "Python",
    description: "Built an AI engine that analyzes network traffic and system logs to detect anomalies and potential threats with 95% accuracy.",
    myContributions: [
      "Created core ML models for anomaly detection",
      "Built REST API for security event processing",
      "Implemented real-time dashboard with React",
      "Wrote comprehensive documentation and deployment guides",
      "Established CI/CD pipeline for automated testing"
    ],
    impact: [
      "Adopted by 3 enterprise security teams",
      "Reduced false positives by 40% compared to traditional tools",
      "Featured in InfoSecurity Magazine",
      "Maintains 4.8/5 rating on GitHub"
    ],
    links: {
      github: "https://github.com/zing254/shadow-ai",
      live: "https://shadow-ai.example.com",
      docs: "https://docs.shadow-ai.example.com"
    }
  },
  {
    id: 2,
    name: "DevOps Toolkit CLI",
    description: "A comprehensive command-line tool for DevOps engineers to automate common infrastructure tasks, deployments, and monitoring across cloud platforms.",
    category: "DevOps Tools",
    tech: ["Go", "Cobra", "Docker", "Kubernetes", "AWS SDK"],
    stars: 180,
    forks: 25,
    language: "Go",
    description: "Streamlined DevOps workflows with a unified CLI tool that replaces multiple specialized tools with consistent commands.",
    myContributions: [
      "Designed and implemented core architecture",
      "Created AWS, Azure, and GCP provider modules",
      "Built Kubernetes deployment and management commands",
      "Added interactive configuration wizard",
      "Implemented plugin system for extensibility"
    ],
    impact: [
      "Used by 15+ development teams internally",
      "Reduced deployment time by 60%",
      "Standardized DevOps practices across organization",
      "Downloaded 5K+ times from GitHub releases"
    ],
    links: {
      github: "https://github.com/zing254/devops-toolkit",
      live: "https://github.com/zing254/devops-toolkit/releases",
      docs: "https://docs.devops-toolkit.example.com"
    }
  },
  {
    id: 3,
    name: "Security Scanner Pro",
    description: "An open-source vulnerability scanner that combines multiple security tools into a single interface for comprehensive security assessments.",
    category: "Security Tools",
    tech: ["Python", "Bash", "Nmap", "Nikto", "SQLMap", "OWASP ZAP"],
    stars: 320,
    forks: 45,
    language: "Python",
    description: "Integrated security scanning tool that automates network, web application, and database vulnerability assessments.",
    myContributions: [
      "Architected modular scanner framework",
      "Integrated 10+ security tools into unified interface",
      "Built web dashboard for scan results visualization",
      "Added automated reporting and alerting system",
      "Created Docker container for easy deployment"
    ],
    impact: [
      "Adopted by cybersecurity firms for client assessments",
      "Identified critical vulnerabilities in 100+ websites",
      "Reduced scan time by 70% through parallel execution",
      "Featured in OWASP community projects"
    ],
    links: {
      github: "https://github.com/zing254/security-scanner-pro",
      live: "https://scanner.security-tools.example.com",
      docs: "https://docs.security-scanner-pro.example.com"
    }
  }
];

const contributionActivities = [
  {
    year: "2023",
    activities: [
      "Mentored 5 first-time contributors through GitHub Mentor program",
      "Presented 'Building AI-Powered Security Tools' at Africa Tech Summit",
      "Organized local Open Source Saturday meetup (30+ attendees)",
      "Contributed bug fixes to 3 major open source projects"
    ]
  },
  {
    year: "2022",
    activities: [
      "Achieved GitHub Star status (>100 followers)",
      "Published technical blog series on DevOps automation",
      "Maintained 2 popular npm packages with 5K+ monthly downloads",
      "Spoke at DevOpsDays Nairobi on Infrastructure as Code"
    ]
  },
  {
    year: "2021",
    activities: [
      "Created open source security training resources",
      "Contributed to OWASP Top 10 prevention guides",
      "Hosted monthly security tooling workshops",
      "Released first version of Shadow AI security engine"
    ]
  }
];

export default function OpenSource() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "AI/ML Security", "DevOps Tools", "Security Tools"];

   const filteredProjects = notableProjects.filter(
     p => activeFilter === "All" || p.category === activeFilter
   );
   
   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: { staggerChildren: 0.1, delayChildren: 0.1 }
     }
   }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="opensource" ref={ref} className="relative py-32 overflow-hidden">
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
            <span className="text-xs font-mono text-primary/80">ls -la ./opensource/</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Open Source </span>
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
              Contributions
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Building in public and contributing to the technology ecosystem through meaningful open source work.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-primary via-white to-secondary"
               style={{ boxShadow: "0 0 20px var(--primary)" }} />
        </motion.div>

        {/* Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="w-4 h-4 text-muted" />
            <span className="text-xs font-mono text-muted">OPEN_SOURCE_IMPACT</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {openSourceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-primary/10`}>
                    <metric.icon className={`w-5 h-5 text-primary`} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white">{metric.value}</h3>
                    <p className="text-xs text-muted">{metric.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <GitBranch className="w-4 h-4" />
            <span className="text-xs font-mono">category:</span>
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
                project.id === 1 ? 'bg-primary/20' :
                project.id === 2 ? 'bg-secondary/20' :
                'bg-accent/20'
              }`} />

              <div className={`
                relative h-full p-6 rounded-2xl glass border overflow-hidden
                transition-all duration-500
                ${hoveredId === project.id ? 'border-primary/50 scale-[1.02]' : 'border-white/5'}
              `}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${project.id === 1 ? 'from-primary/20 to-primary/5' : project.id === 2 ? 'from-secondary/20 to-secondary/5' : 'from-accent/20 to-accent/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      project.id === 1 ? 'bg-primary/10' :
                      project.id === 2 ? 'bg-secondary/10' :
                      'bg-accent/10'
                    }`}>
                      {project.id === 1 && (
                        <GitBranch className={`w-6 h-6 text-primary`} />
                      )}
                      {project.id === 2 && (
                        <Code className={`w-6 h-6 text-primary`} />
                      )}
                      {project.id === 3 && (
                        <Shield className={`w-6 h-6 text-primary`} />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1 text-xs text-warning">
                          <Star className="w-3 h-3 fill-warning" />
                          <span className="font-mono">{project.stars}</span>
                        </div>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        'Live'
                      }`}>
                        Live
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono mb-3" style={{
                    color: project.id === 1 ? 'var(--primary)' :
                           project.id === 2 ? 'var(--secondary)' :
                           'var(--accent)'
                  }}>
                    {project.tagline}
                  </p>
                  <p className="text-sm text-gray-400 mb-4 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded text-xs font-mono glass border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 rounded text-xs font-mono text-muted">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* My Contributions */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">my_contributions</span>
                    </div>
                    <div className="space-y-2">
                      {project.myContributions.map((contribution, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <ChevronRight className={`w-3 h-3 text-primary`} />
                          <span>{contribution}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">impact</span>
                    </div>
                    <div className="space-y-2">
                      {project.impact.map((impact, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <ChevronRight className={`w-3 h-3 text-primary`} />
                          <span>{impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm font-mono transition-colors ${
                        project.id === 1 ? 'text-primary hover:text-primary/80' :
                        project.id === 2 ? 'text-secondary hover:text-secondary/80' :
                        'text-accent hover:text-accent/80'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Repo</span>
                    </a>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-muted hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-muted hover:text-white transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Documentation</span>
                    </a>
                    
                    <div className="flex-grow" />
                    
                    <motion.div
                      style={{ transform: `translateX(${hoveredId === project.id ? 0 : 4}px)`, transition: 'transform 0.2s' }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center gap-1 text-sm font-mono ${
                        project.id === 1 ? 'text-primary' :
                        project.id === 2 ? 'text-secondary' :
                        'text-accent'
                      }`}
                    >
                      <span className="text-xs">View</span>
                      <ArrowRight className="w-3 h-3" />
                    </motion.div>
                  </div>

                  {/* Corner decoration */}
                  <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl ${
                    project.id === 1 ? 'border-primary/20' :
                    project.id === 2 ? 'border-secondary/20' :
                    'border-accent/20'
                  }`} />
                </div>
              </div>
              </motion.div>
          ))}
        </motion.div>

        {/* Contribution Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative p-8 rounded-2xl glass border border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-xl bg-primary/10">
                <GitBranch className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Open Source Journey
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  &quot;Open source is more than just code—it's about community, collaboration, and creating technology that benefits everyone. I believe in giving back to the ecosystem that has given me so much.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-heading font-black text-primary/30">100%</span>
                <span className="text-xs text-muted font-mono">commitment<br/>to opensource</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="space-y-6">
            {contributionActivities.map((yearData) => (
              <motion.div
                key={yearData.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border-l-2 border-primary/50 pl-4"
              >
                <h3 className="font-heading text-lg font-bold text-primary mb-2">
                  {yearData.year}
                </h3>
                <div className="space-y-2">
                  {yearData.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="w-3 h-3 text-primary/50" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}