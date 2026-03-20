"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  GraduationCap, Award, BookOpen, Trophy,
  ExternalLink, Terminal, Star, Sparkles,
  Shield, Code2, Server, Globe
} from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Certified Ethical Hacker",
    fullName: "CEH - Certified Ethical Hacker",
    issuer: "EC-Council",
    year: "2023",
    category: "Security",
    icon: Shield,
    color: "warning",
    gradient: "from-warning/20 to-warning/5",
    description: "Mastered penetration testing, footprinting, reconnaissance, and vulnerability analysis.",
    credentialId: "ECC-XXXXX",
    verified: true
  },
  {
    id: 2,
    name: "Computer Science",
    fullName: "BSc. Computer Science",
    issuer: "Riara University",
    year: "2022 - Present",
    category: "Education",
    icon: GraduationCap,
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
    description: "Pursuing comprehensive CS education with focus on software engineering and security.",
    credentialId: "RU-CS-2022",
    verified: true
  },
  {
    id: 3,
    name: "CS50x",
    fullName: "CS50: Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2023",
    category: "Education",
    icon: Globe,
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
    description: "Completed Harvard&apos;s legendary CS course covering C, Python, SQL, JavaScript, and more.",
    credentialId: "Harvard-CS50-2023",
    verified: true
  },
  {
    id: 4,
    name: "AWS Solutions Architect",
    fullName: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
    category: "DevOps",
    icon: Server,
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
    description: "Designing distributed systems on AWS. EC2, S3, Lambda, VPC, and more.",
    credentialId: "AWS-SAA-XXXXX",
    verified: true
  },
  {
    id: 5,
    name: "Docker Mastery",
    fullName: "Docker & Kubernetes Mastery",
    issuer: "Udemy",
    year: "2023",
    category: "DevOps",
    icon: Code2,
    color: "primary",
    gradient: "from-primary/20 to-secondary/5",
    description: "Container orchestration, Docker Compose, Kubernetes deployments, and CI/CD.",
    credentialId: "UD-DOCKER-XXXXX",
    verified: true
  },
  {
    id: 6,
    name: "Google Cybersecurity",
    fullName: "Google Cybersecurity Certificate",
    issuer: "Google",
    year: "2023",
    category: "Security",
    icon: Shield,
    color: "warning",
    gradient: "from-warning/20 to-primary/5",
    description: "Security frameworks, SIEM tools, incident response, and risk management.",
    credentialId: "GOOGLE-CYBER-XXXXX",
    verified: true
  },
  {
    id: 7,
    name: "Meta Frontend",
    fullName: "Meta Frontend Developer Certificate",
    issuer: "Meta",
    year: "2023",
    category: "Frontend",
    icon: Code2,
    color: "accent",
    gradient: "from-accent/20 to-primary/5",
    description: "React, Version Control, UI/UX principles, and modern frontend development.",
    credentialId: "META-FE-XXXXX",
    verified: true
  },
  {
    id: 8,
    name: "Machine Learning",
    fullName: "Machine Learning Specialization",
    issuer: "Stanford Online",
    year: "2024",
    category: "AI/ML",
    icon: Sparkles,
    color: "secondary",
    gradient: "from-secondary/20 to-accent/5",
    description: "Supervised/unsupervised learning, neural networks, and practical ML applications.",
    credentialId: "STANFORD-ML-XXXXX",
    verified: false
  }
];

const categories = ["All", "Security", "DevOps", "Frontend", "AI/ML", "Education"];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredCerts = certifications.filter(
    c => activeFilter === "All" || c.category === activeFilter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { label: "Certifications", value: certifications.length, icon: Award },
    { label: "Verified", value: certifications.filter(c => c.verified).length, icon: Trophy },
    { label: "In Progress", value: certifications.filter(c => c.credentialId.includes("XXXXX")).length, icon: BookOpen },
  ];

  return (
    <section id="education" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] bg-secondary/5" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-primary/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-secondary/30 mb-6">
            <span className="text-xs font-mono text-secondary/80">cat education.json</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Certifications & </span>
            <span className="glow-text-secondary text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Learning
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Continuous learning is the only constant. Here&apos;s my journey of growth and skill acquisition.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-secondary via-primary to-accent"
               style={{ boxShadow: "0 0 20px var(--secondary)" }} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl glass border border-white/5">
              <stat.icon className="w-5 h-5 text-secondary" />
              <span className="font-heading text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
                ${activeFilter === category
                  ? 'bg-secondary/20 text-secondary border border-secondary/50'
                  : 'glass border border-white/5 hover:border-white/20 text-muted hover:text-white'
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Certifications grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredId(cert.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Glow */}
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                cert.color === 'primary' ? 'bg-primary/20' :
                cert.color === 'secondary' ? 'bg-secondary/20' :
                cert.color === 'accent' ? 'bg-accent/20' :
                'bg-warning/20'
              }`} />

              <div className={`
                relative h-full p-5 rounded-2xl glass border overflow-hidden
                transition-all duration-500 cursor-pointer
                ${hoveredId === cert.id ? 'border-primary/50' : 'border-white/5'}
              `}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${cert.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      cert.color === 'primary' ? 'bg-primary/10' :
                      cert.color === 'secondary' ? 'bg-secondary/10' :
                      cert.color === 'accent' ? 'bg-accent/10' :
                      'bg-warning/10'
                    }`}>
                      <cert.icon className={`w-6 h-6 ${
                        cert.color === 'primary' ? 'text-primary' :
                        cert.color === 'secondary' ? 'text-secondary' :
                        cert.color === 'accent' ? 'text-accent' :
                        'text-warning'
                      }`} />
                    </div>
                    
                    {cert.verified ? (
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-accent/10 border border-accent/30">
                        <Trophy className="w-3 h-3 text-accent" />
                        <span className="text-xs font-mono text-accent">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-muted/10 border border-muted/30">
                        <Star className="w-3 h-3 text-muted" />
                        <span className="text-xs font-mono text-muted">In Progress</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-lg font-bold mb-1 text-white group-hover:text-primary transition-colors line-clamp-1">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-muted mb-3 line-clamp-1">{cert.issuer}</p>
                  
                  <p 
                    className="text-xs text-gray-400 mb-4 flex-grow leading-relaxed [&>em]:text-secondary [&>em]:not-italic"
                    dangerouslySetInnerHTML={{ __html: cert.description }}
                  />

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-muted font-mono">
                      <Terminal className="w-3 h-3" />
                      <span>{cert.year}</span>
                    </div>
                    
                    <div className={`px-2 py-1 rounded text-xs font-mono ${
                      cert.category === 'Security' ? 'bg-warning/10 text-warning' :
                      cert.category === 'DevOps' ? 'bg-accent/10 text-accent' :
                      cert.category === 'Frontend' ? 'bg-primary/10 text-primary' :
                      cert.category === 'AI/ML' ? 'bg-secondary/10 text-secondary' :
                      'bg-muted/10 text-muted'
                    }`}>
                      {cert.category}
                    </div>
                  </div>

                  {/* Credential ID on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hoveredId === cert.id ? 1 : 0, y: hoveredId === cert.id ? 0 : 10 }}
                    className="mt-3 p-2 rounded bg-black/20 border border-white/5"
                  >
                    <p className="text-xs font-mono text-muted">Credential ID:</p>
                    <p className="text-xs font-mono text-primary truncate">{cert.credentialId}</p>
                  </motion.div>
                </div>

                {/* Corner decoration */}
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg ${
                  cert.color === 'primary' ? 'border-primary/20' :
                  cert.color === 'secondary' ? 'border-secondary/20' :
                  cert.color === 'accent' ? 'border-accent/20' :
                  'border-warning/20'
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative p-8 rounded-2xl glass border border-secondary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-primary/5" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-xl bg-secondary/10">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Learning Never Stops
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  &quot;The moment you stop learning is the moment you start decaying. 
                  I dedicate at least 2 hours daily to learning something new — whether it&apos;s 
                  a new framework, security technique, or AI advancement.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-heading font-black text-secondary/30">100%</span>
                <span className="text-xs text-muted font-mono">commitment<br/>to growth</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
}
