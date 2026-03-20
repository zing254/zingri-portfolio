"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Code2, Server, Shield, Cloud, Brain, 
  ChevronRight, Terminal, Layers, Cpu, Database, Lock, Sparkles 
} from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    icon: Code2,
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    skills: [
      { name: "Next.js 14", level: 95, years: 3 },
      { name: "TypeScript", level: 90, years: 3 },
      { name: "React", level: 88, years: 3 },
      { name: "TailwindCSS", level: 92, years: 2 },
      { name: "Framer Motion", level: 85, years: 1 },
    ]
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
    borderColor: "border-secondary/30",
    skills: [
      { name: "Node.js", level: 85, years: 3 },
      { name: "Python", level: 80, years: 2 },
      { name: "PostgreSQL", level: 78, years: 2 },
      { name: "REST APIs", level: 90, years: 3 },
      { name: "GraphQL", level: 72, years: 1 },
    ]
  },
  {
    id: "devops",
    name: "DevOps",
    icon: Cloud,
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
    skills: [
      { name: "Docker", level: 88, years: 2 },
      { name: "AWS", level: 82, years: 2 },
      { name: "CI/CD", level: 90, years: 2 },
      { name: "Kubernetes", level: 65, years: 1 },
      { name: "Terraform", level: 60, years: 1 },
    ]
  },
  {
    id: "security",
    name: "Security",
    icon: Shield,
    color: "warning",
    gradient: "from-warning/20 to-warning/5",
    borderColor: "border-warning/30",
    skills: [
      { name: "Penetration Testing", level: 78, years: 2 },
      { name: "OWASP Top 10", level: 85, years: 2 },
      { name: "Network Security", level: 75, years: 2 },
      { name: "Malware Analysis", level: 60, years: 1 },
      { name: "CTF Champion", level: 70, years: 1 },
    ]
  },
  {
    id: "aiml",
    name: "AI/ML",
    icon: Brain,
    color: "pink",
    gradient: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    skills: [
      { name: "LangChain", level: 75, years: 1 },
      { name: "TensorFlow", level: 65, years: 1 },
      { name: "OpenAI API", level: 85, years: 1 },
      { name: "Vector DBs", level: 70, years: 1 },
      { name: "Prompt Engineering", level: 88, years: 1 },
    ]
  },
];

const iconMap: Record<string, React.ElementType> = {
  Code2, Server, Cloud, Shield, Brain, Cpu, Database, Lock, Layers, Sparkles
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[200px] bg-primary/5" />
      
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
            <span className="text-xs font-mono text-secondary/80">npm list skills --depth=0</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Tech </span>
            <span className="glow-text-secondary text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Stack
            </span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Weapons of choice. Mastered through countless hours of debugging and coffee.
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-secondary via-primary to-accent"
               style={{ boxShadow: "0 0 20px var(--secondary)" }} />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={`
                relative px-5 py-3 rounded-xl font-mono text-sm transition-all duration-300
                ${activeCategory === category.id 
                  ? `bg-gradient-to-r ${category.gradient} border ${category.borderColor} shadow-lg` 
                  : 'glass border border-white/5 hover:border-white/20'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <category.icon className={`w-4 h-4 ${
                  category.color === 'primary' ? 'text-primary' :
                  category.color === 'secondary' ? 'text-secondary' :
                  category.color === 'accent' ? 'text-accent' :
                  category.color === 'warning' ? 'text-warning' :
                  'text-pink-500'
                }`} />
                <span className="hidden sm:inline">{category.name}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories
            .filter(cat => !activeCategory || cat.id === activeCategory)
            .map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={`
                  relative p-6 rounded-2xl glass border overflow-hidden
                  hover:border-primary/30 transition-all duration-500
                `}
              >
                {/* Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${category.gradient} opacity-0 hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} border ${category.borderColor}`}>
                        <category.icon className={`w-6 h-6 ${
                          category.color === 'primary' ? 'text-primary' :
                          category.color === 'secondary' ? 'text-secondary' :
                          category.color === 'accent' ? 'text-accent' :
                          category.color === 'warning' ? 'text-warning' :
                          'text-pink-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-white">{category.name}</h3>
                        <p className="text-xs text-muted">{category.skills.length} skills</p>
                      </div>
                    </div>
                  </div>

                  {/* Skill bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill, index) => (
                      <div key={skill.name} className="group">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted font-mono">
                            {skill.level}% • {skill.years}y
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                            className={`h-full rounded-full relative ${
                              category.color === 'primary' ? 'bg-gradient-to-r from-primary to-cyan-300' :
                              category.color === 'secondary' ? 'bg-gradient-to-r from-secondary to-purple-300' :
                              category.color === 'accent' ? 'bg-gradient-to-r from-accent to-green-300' :
                              category.color === 'warning' ? 'bg-gradient-to-r from-warning to-orange-300' :
                              'bg-gradient-to-r from-pink-500 to-rose-300'
                            }`}
                            style={{
                              boxShadow: `0 0 10px ${
                                category.color === 'primary' ? 'var(--primary)' :
                                category.color === 'secondary' ? 'var(--secondary)' :
                                category.color === 'accent' ? 'var(--accent)' :
                                category.color === 'warning' ? 'var(--warning)' :
                                '#ec4899'
                              }`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Corner decoration */}
                <div className={`absolute top-0 right-0 w-16 h-16 border-${category.color === 'primary' ? 'primary' : category.color === 'secondary' ? 'secondary' : 'accent'}-500/20 border-r-2 border-t-2 rounded-tr-2xl`} />
              </motion.div>
            ))}
        </motion.div>

        {/* Additional tools marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Terminal className="w-4 h-4 text-muted" />
            <span className="text-xs font-mono text-muted">ALSO_FAMILIAR_WITH</span>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-marquee">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  {["Git", "Linux", "Bash", "Redis", "MongoDB", "Nginx", "Vercel", "GitHub Actions", "Figma", "Notion", "VS Code", "Chrome DevTools"].map((tool) => (
                    <span key={tool} className="px-4 py-2 rounded-lg glass border border-white/10 text-sm font-mono text-muted whitespace-nowrap">
                      {tool}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
}
