"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Users, Terminal, Shield, Code, Zap, Award, 
  Calendar, Check, Brain, Globe, Rocket,
  TrendingUp, ClipboardList
} from "lucide-react";

const leadershipSkills = [
  { name: "Team Building & Hiring", level: 90, years: 5 },
  { name: "Technical Leadership", level: 92, years: 6 },
  { name: "Project & Program Management", level: 88, years: 5 },
  { name: "Performance Coaching", level: 85, years: 4 },
  { name: "Strategic Planning", level: 85, years: 4 },
  { name: "Conflict Resolution", level: 80, years: 4 },
  { name: "Mentoring & Skill Development", level: 90, years: 5 },
  { name: "Cross-functional Collaboration", level: 88, years: 5 },
  { name: "Change Management", level: 82, years: 3 },
  { name: "Innovation Fosterng", level: 85, years: 3 },
  { name: "Budget & Resource Management", level: 78, years: 3 },
  { name: "Presentation & Communication", level: 90, years: 5 },
];

const leadershipExperiences = [
  {
    id: 1,
    role: "Engineering Manager / Tech Lead",
    organization: "Tech Startup",
    period: "2022 - Present",
    teamSize: "Grew from 2 to 8 engineers",
    scope: "Full-stack platform team responsible for core APIs and services",
    color: "primary",
    icon: Users,
    description: "Joined as first engineering hire to build team and platform from scratch, establishing engineering culture and technical foundation.",
    achievements: [
      "Hired 6 engineers through structured interviewing process",
      "Implemented bi-weekly 1:1s and quarterly career development talks",
      "Created technical ladder and promotion framework",
      "3 team members promoted to senior roles during tenure",
      "Grew team from 2 engineers to 8 in 18 months",
      "Team satisfaction score: 4.7/5 (up from initial 3.0/5 assessment)"
    ],
    technicalLeadership: [
      "Defined API standards and architectural guidelines",
      "Introduced automated testing culture (increased coverage from 20% to 80%)",
      "Led migration from monolith to microservices",
      "Established code review process with mandatory approvals",
      "Implemented feature flag system for safe deployments"
    ],
    deliveryExecution: [
      "Increased feature delivery velocity by 3x",
      "Achieved 90%+ sprint predictability after 6 months",
      "Reduced production incidents by 60% through improved monitoring",
      "Zero major security incidents during tenure",
      "Maintained 99.9% uptime for critical services"
    ],
    initiatives: [
      "Implemented 'Innovation Friday' - 20% time for technical exploration",
      "Created onboarding buddy system for new hires",
      "Established monthly tech talk series",
      "Introduced blameless post-mortem culture",
      "Launched internal open source initiative for reusable components"
    ]
  },
  {
    id: 2,
    role: "Technical Director",
    organization: "Consulting Firm",
    period: "2020 - 2022",
    teamSize: "15 engineers across 3 time zones",
    scope: "Multiple client projects in fintech and healthcare domains",
    color: "secondary",
    icon: Globe,
    description: "Inherited existing team with communication and delivery challenges, transformed into high-performing global team.",
    achievements: [
      "Implemented 'follow-the-sun' handoff process for global collaboration",
      "Created regional tech leads to improve local support",
      "Instituted cross-regional pairing program for knowledge sharing",
      "Reduced turnover from 40% annual to 15% annual",
      "Improved team satisfaction scores from 3.2 to 4.6/5"
    ],
    technicalLeadership: [
      "Established architectural review board for cross-project consistency",
      "Created reusable component library reducing boilerplate by 40%",
      "Standardized on TypeScript and React across all frontend projects",
      "Implemented automated security scanning in all CI pipelines",
      "Defined technology standards and approval process for new tools"
    ],
    deliveryExecution: [
      "Improved cross-timezone collaboration efficiency by 50%",
      "Increased client satisfaction scores from 3.8 to 4.6/5",
      "Reduced project overruns from 30% to 10%",
      "Successfully delivered 12+ concurrent client projects",
      "Maintained 95%+ on-time delivery rate"
    ],
    initiatives: [
      "Created 'Global Tech Community' Slack channels for informal connection",
      "Instituted quarterly in-person team summits (rotating locations)",
      "Implemented transparent salary bands and promotion criteria",
      "Launched mentorship program pairing junior and senior engineers",
      "Introduced OKR framework for team goal setting"
    ]
  },
  {
    id: 3,
    role: "Maintainer / Project Lead",
    organization: "Open Source Community",
    period: "2021 - Present (Ongoing)",
    teamSize: "Core team of 4 maintainers, ~20 regular contributors",
    scope: "Popular open source developer tool",
    color: "accent",
    icon: Code,
    description: "Elected to maintainership through community meritocracy, leading technical direction and community growth.",
    achievements: [
      "Mentored 15+ first-time contributors to become regular contributors",
      "Created contributor onboarding guide and documentation",
      "Implemented 'good first issue' labeling system",
      "Established clear contribution guidelines and code of conduct",
      "Maintained 95%+ PR response rate within 48 hours"
    ],
    technicalLeadership: [
      "Defined project roadmap and release cycle (quarterly major releases)",
      "Maintained backward compatibility while introducing breaking changes",
      "Led architectural evolution from CLI-only to plugin-based architecture",
      "Established security audit process for dependencies",
      "Implemented automated changelog generation"
    ],
    deliveryExecution: [
      "Grew monthly downloads from 5K to 50K+",
      "Maintained 99.9%+ availability for npm package",
      "Reduced average issue response time from 5 days to 12 hours",
      "Achieved 80%+ PR merge rate within 2 weeks",
      "Zero security vulnerabilities reported in maintained versions"
    ],
    initiatives: [
      "Created monthly contributor office hours",
      "Implemented automated changelog generation",
      "Established sustainability fund through Open Collective",
      "Launched documentation translation initiative",
      "Created diversity and inclusion statement for project"
    ]
  }
];

export default function Leadership() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "Team Building", "Technical Leadership", "Global Teams", "Open Source"];

  const filteredExperiences = leadershipExperiences.filter(
    exp => activeFilter === "All" || 
           (activeFilter === "Team Building" && exp.id === 1) ||
           (activeFilter === "Technical Leadership" && exp.id === 2) ||
           (activeFilter === "Global Teams" && exp.id === 2) ||
           (activeFilter === "Open Source" && exp.id === 3)
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
    <section id="leadership" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] bg-secondary/5" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-primary/5" />

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
            <span className="text-xs font-mono text-primary/80">cat leadership.json</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Leadership & </span>
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
              Mentoring
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Building high-performing teams and developing technical talent through servant leadership and technical excellence.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-primary via-white to-secondary"
               style={{ boxShadow: "0 0 20px var(--primary)" }} />
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
            <span className="text-xs font-mono text-muted">LEADERSHIP_SKILLS</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipSkills.map((skill, index) => (
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
                    <Users className={`w-5 h-5 text-primary`} />
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

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 mr-4 text-muted">
            <Users className="w-4 h-4" />
            <span className="text-xs font-mono">focus:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                relative px-4 py-2 rounded-lg font-mono text-sm transition_all duration-300
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

        {/* Experiences grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExperiences.map((experience) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredId(experience.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                experience.color === 'primary' ? 'bg-primary/20' :
                experience.color === 'secondary' ? 'bg-secondary/20' :
                experience.color === 'accent' ? 'bg-accent/20' :
                'bg-warning/20'
              }`} />

              <div className={`
                relative h-full p-6 rounded-2xl glass border overflow-hidden
                transition-all duration-500
                ${hoveredId === experience.id ? 'border-primary/50 scale-[1.02]' : 'border-white/5'}
              `}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${experience.color === 'primary' ? 'from-primary/20 to-primary/5' : experience.color === 'secondary' ? 'from-secondary/20 to-secondary/5' : experience.color === 'accent' ? 'from-accent/20 to-accent/5' : 'from-warning/20 to-warning/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      experience.color === 'primary' ? 'bg-primary/10' :
                      experience.color === 'secondary' ? 'bg-secondary/10' :
                      experience.color === 'accent' ? 'bg-accent/10' :
                      'bg-warning/10'
                    }`}>
                      <experience.icon className={`w-6 h-6 ${
                        experience.color === 'primary' ? 'text-primary' :
                        experience.color === 'secondary' ? 'text-secondary' :
                        experience.color === 'accent' ? 'text-accent' :
                        'text-warning'
                      }`} />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-xl font-bold text-white">{experience.role}</h3>
                      <p className="text-xs font-mono">{experience.organization}</p>
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        experience.color === 'primary' ? 'text-primary' :
                        experience.color === 'secondary' ? 'text-secondary' :
                        experience.color === 'accent' ? 'text-accent' :
                        'text-warning'
                      }`}>
                        {experience.period}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">overview</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {experience.description}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">achievements</span>
                    </div>
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className={`w-3 h-3 text-primary`} />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Leadership */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">technical_leadership</span>
                    </div>
                    <div className="space-y-2">
                      {experience.technicalLeadership.map((leadership, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className={`w-3 h-3 text-primary`} />
                          <span>{leadership}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Execution */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">delivery</span>
                    </div>
                    <div className="space-y-2">
                      {experience.deliveryExecution.map((delivery, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className={`w-3 h-3 text-primary`} />
                          <span>{delivery}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Initiatives */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardList className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono text-primary/80">initiatives</span>
                    </div>
                    <div className="space-y-2">
                      {experience.initiatives.map((initiative, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className={`w-3 h-3 text-primary`} />
                          <span>{initiative}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-xl ${
                    experience.color === 'primary' ? 'border-primary/20' :
                    experience.color === 'secondary' ? 'border-secondary/20' :
                    experience.color === 'accent' ? 'border-accent/20' :
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
            <span className="text-muted font-mono text-sm">More leadership insights on LinkedIn</span>
            <motion.a
              href="https://linkedin.com"
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