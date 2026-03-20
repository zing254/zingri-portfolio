"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Briefcase, Calendar, MapPin, Terminal, 
  ChevronRight, Sparkles, Building2, Cpu, Shield 
} from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Fleek Tech",
    role: "Co-Founder",
    type: "Full-time",
    period: "Jan 2024 - Present",
    location: "Nairobi, Kenya",
    color: "primary",
    description: "Co-founded a tech startup focused on delivering cutting-edge digital solutions. Building scalable web applications and leading the technical direction of the company.",
    achievements: [
      "Architected 5+ production applications",
      "Led team of 3 developers",
      "Established CI/CD pipelines",
      "Client satisfaction: 100%"
    ],
    tech: ["Next.js", "TypeScript", "AWS", "Docker"],
    icon: Sparkles
  },
  {
    id: 2,
    company: "ZFT",
    role: "Founder & Developer",
    type: "Self-employed",
    period: "Sep 2023 - Present",
    location: "Nairobi, Kenya",
    color: "secondary",
    description: "Independent development practice specializing in full-stack solutions and automation tools. Building products that solve real problems.",
    achievements: [
      "Shipped Shadow AI platform",
      "Built Kenya Overwatch system",
      "90+ GitHub contributions",
      "Open source contributor"
    ],
    tech: ["Python", "React", "Node.js", "PostgreSQL"],
    icon: Building2
  },
  {
    id: 3,
    company: "Antiq-log",
    role: "Lead Supervisor",
    type: "Part-time",
    period: "Mar 2023 - Dec 2023",
    location: "Nairobi, Kenya",
    color: "accent",
    description: "Led a team of 5 in managing and supervising inventory systems. Implemented automation that reduced manual work by 60%.",
    achievements: [
      "Reduced processing time by 60%",
      "Team of 5 supervised",
      "System automation lead",
      "Process optimization"
    ],
    tech: ["React", "Node.js", "MongoDB", "REST API"],
    icon: Cpu
  },
  {
    id: 4,
    company: "Telkom Kenya",
    role: "Cybersecurity Intern",
    type: "Internship",
    period: "Jun 2022 - Aug 2022",
    location: "Nairobi, Kenya",
    color: "warning",
    description: "Gained hands-on experience in corporate cybersecurity environment. Learned network security, vulnerability assessment, and incident response.",
    achievements: [
      "Completed security certifications",
      "Network monitoring exposure",
      "Incident response training",
      "Penetration testing basics"
    ],
    tech: ["Security Tools", "Linux", "Network Protocols", "SIEM"],
    icon: Shield
  }
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="experience" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 right-0 translate-x-1/3 w-[600px] h-[600px] rounded-full blur-[180px] bg-accent/5" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30 mb-6">
            <span className="text-xs font-mono text-accent/80">cat experience.log</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Work </span>
            <span className="glow-text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              History
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            The journey from intern to founder. Every line of code, every late night, every breakthrough.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-accent via-secondary to-primary"
               style={{ boxShadow: "0 0 20px var(--accent)" }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50" />
          
          {/* Mobile line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    exp.color === 'primary' ? 'border-primary bg-primary' :
                    exp.color === 'secondary' ? 'border-secondary bg-secondary' :
                    exp.color === 'accent' ? 'border-accent bg-accent' :
                    'border-warning bg-warning'
                  }`}
                  style={{
                    boxShadow: `0 0 20px ${
                      exp.color === 'primary' ? 'var(--primary)' :
                      exp.color === 'secondary' ? 'var(--secondary)' :
                      exp.color === 'accent' ? 'var(--accent)' :
                      'var(--warning)'
                    }`
                  }}
                />
                </div>

                {/* Content card */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`
                    relative p-6 rounded-2xl glass border overflow-hidden
                    hover:border-primary/30 transition-all duration-500 group
                  `}>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                      exp.color === 'primary' ? 'from-primary/5 to-transparent' :
                      exp.color === 'secondary' ? 'from-secondary/5 to-transparent' :
                      exp.color === 'accent' ? 'from-accent/5 to-transparent' :
                      'from-warning/5 to-transparent'
                    }`} />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            exp.color === 'primary' ? 'bg-primary/10' :
                            exp.color === 'secondary' ? 'bg-secondary/10' :
                            exp.color === 'accent' ? 'bg-accent/10' :
                            'bg-warning/10'
                          }`}>
                            <exp.icon className={`w-5 h-5 ${
                              exp.color === 'primary' ? 'text-primary' :
                              exp.color === 'secondary' ? 'text-secondary' :
                              exp.color === 'accent' ? 'text-accent' :
                              'text-warning'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-heading text-xl font-bold text-white">{exp.role}</h3>
                            <p className={`text-sm font-semibold ${
                              exp.color === 'primary' ? 'text-primary' :
                              exp.color === 'secondary' ? 'text-secondary' :
                              exp.color === 'accent' ? 'text-accent' :
                              'text-warning'
                            }`}>{exp.company}</p>
                          </div>
                        </div>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-mono
                          ${exp.type === 'Full-time' ? 'bg-accent/10 text-accent' :
                            exp.type === 'Part-time' ? 'bg-secondary/10 text-secondary' :
                            exp.type === 'Self-employed' ? 'bg-primary/10 text-primary' :
                            'bg-warning/10 text-warning'
                          }
                        `}>
                          {exp.type}
                        </span>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="font-mono">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Terminal className="w-3 h-3 text-primary" />
                          <span className="text-xs font-mono text-primary/80">achievements</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                              <ChevronRight className={`w-3 h-3 ${
                                exp.color === 'primary' ? 'text-primary' :
                                exp.color === 'secondary' ? 'text-secondary' :
                                exp.color === 'accent' ? 'text-accent' :
                                'text-warning'
                              }`} />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 rounded text-xs font-mono glass border border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div className={`absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 rounded-tr-xl ${
                      exp.color === 'primary' ? 'border-primary/30' :
                      exp.color === 'secondary' ? 'border-secondary/30' :
                      exp.color === 'accent' ? 'border-accent/30' :
                      'border-warning/30'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Experience", value: "3+ Years" },
            { label: "Companies", value: "4" },
            { label: "Technologies", value: "20+" },
            { label: "Success Rate", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl glass border border-white/5 text-center">
              <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted font-mono">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}
