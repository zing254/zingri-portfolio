// ⚙️ BAZENGA CONFIGURATION
// ZINGRI'S DIGITAL NEXUS - Type-safe configuration system

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  level?: number; // 1-100 for visualization
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  url?: string;
  github?: string;
  status: 'live' | 'development' | 'archived';
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current: boolean;
  description?: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

export interface ThemeColors {
  primary: string;    // Cyan - #00ffff
  secondary: string; // Purple - #a855f7
  accent: string;    // Neon Green - #39ff14
  background: string; // Dark - #0a0a0a
  surface: string;    // Surface - #111111
  text: string;       // Text - #ffffff
  textMuted: string;  // Muted text - #888888
}

// ==========================================
// 🎨 THEME COLORS (Cyberpunk Aesthetic)
// ==========================================

export const themeColors: ThemeColors = {
  primary: '#00ffff',      // Cyan
  secondary: '#a855f7',    // Purple
  accent: '#39ff14',       // Neon Green
  background: '#0a0a0a',   // Deep Black
  surface: '#111111',      // Dark Surface
  text: '#ffffff',         // White
  textMuted: '#888888',    // Gray
};

// ==========================================
// 👤 PERSONAL INFORMATION
// ==========================================

export const personalInfo = {
  name: 'ZINGRI MASTER',
  title: 'Full-Stack Developer | DevOps Engineer | Ethical Hacker',
  bio: 'Full-Stack Developer, DevOps Engineer, Ethical Hacker. Building the future of tech from Nairobi, Kenya.',
  email: 'hello@zingri.dev',
  location: 'Nairobi, Kenya',
  timezone: 'Africa/Nairobi (EAT, UTC+3)',
  avatar: '/images/avatar.png',
  status: 'Available for freelance & collaboration',
};

// ==========================================
// 🔗 SOCIAL LINKS
// ==========================================

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/zing254',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: '',
    icon: 'Linkedin',
  },
  {
    name: 'Twitter',
    url: '',
    icon: 'Twitter',
  },
  {
    name: 'Email',
    url: 'mailto:hello@zingri.dev',
    icon: 'Mail',
  },
];

// ==========================================
// 🛠 SKILLS BY CATEGORY
// ==========================================

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'Code',
    skills: [
      { name: 'JavaScript/TypeScript', level: 95 },
      { name: 'Python', level: 88 },
      { name: 'Go', level: 75 },
      { name: 'Rust', level: 60 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    name: 'Frontend',
    icon: 'Palette',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Next.js', level: 90 },
      { name: 'Vue', level: 78 },
      { name: 'Svelte', level: 70 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    name: 'Backend & Database',
    icon: 'Database',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'FastAPI', level: 80 },
      { name: 'Django', level: 75 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 78 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: 'Cloud',
    skills: [
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 78 },
      { name: 'CI/CD', level: 88 },
      { name: 'AWS', level: 80 },
      { name: 'Linux', level: 92 },
    ],
  },
  {
    name: 'Security',
    icon: 'Shield',
    skills: [
      { name: 'Ethical Hacking', level: 88 },
      { name: 'CEH Certified', level: 85 },
      { name: 'OWASP', level: 82 },
      { name: 'Penetration Testing', level: 80 },
      { name: 'Security Auditing', level: 78 },
    ],
  },
  {
    name: 'AI & Machine Learning',
    icon: 'Brain',
    skills: [
      { name: 'TensorFlow', level: 75 },
      { name: 'PyTorch', level: 72 },
      { name: 'NLP', level: 78 },
      { name: 'Computer Vision', level: 65 },
      { name: 'LLMs / AI Integration', level: 80 },
    ],
  },
];

// Flat list of all skills for quick lookup
export const allSkills = skillCategories.flatMap(cat => cat.skills.map(s => s.name));

// ==========================================
// 💼 PROJECTS
// ==========================================

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  url?: string;
  github?: string;
  status: 'live' | 'development' | 'archived';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Shadow AI',
    description: 'AI-powered personal assistant with natural language understanding and task automation capabilities.',
    longDescription: 'A sophisticated AI assistant built with modern NLP techniques, capable of understanding context, managing tasks, and providing intelligent responses. Features include conversation memory, custom skill plugins, and seamless integration with various APIs.',
    tech: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI', 'React', 'Redis', 'Docker'],
    github: '',
    status: 'live',
    featured: true,
  },
  {
    name: 'Kenya Overwatch',
    description: 'Road safety monitoring system using computer vision and real-time analytics for Kenyan roads.',
    longDescription: 'An innovative road safety platform that leverages computer vision to monitor traffic patterns, detect violations, and provide real-time alerts. Built specifically for the Kenyan context with integration to local traffic authorities.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Next.js', 'PostgreSQL', 'AWS', 'Kafka'],
    url: '',
    status: 'live',
    featured: true,
  },
  {
    name: 'Dept Collector',
    description: 'FinTech solution for automated debt collection and payment reconciliation for businesses.',
    longDescription: 'A comprehensive debt management platform that automates the collection process, sends smart reminders, handles payment plans, and provides detailed analytics for financial institutions.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    url: '',
    status: 'live',
    featured: true,
  },
  {
    name: 'Z-Office',
    description: 'Virtual office platform for remote teams with real-time collaboration and spatial audio.',
    longDescription: 'A next-generation virtual workspace that simulates the feeling of being in an office. Features spatial audio so conversations feel natural, customizable office spaces, and deep integrations with productivity tools.',
    tech: ['TypeScript', 'Next.js', 'WebRTC', 'Socket.io', 'MongoDB', 'Redis', 'Framer Motion'],
    url: '',
    status: 'development',
    featured: true,
  },
  {
    name: 'fleektech.co.ke',
    description: 'Corporate website for Fleek Tech — a modern tech company based in Kenya.',
    longDescription: 'Professional business website showcasing Fleek Tech services, portfolio, and team. Features smooth animations, case studies, and contact integration.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Sanity CMS'],
    url: 'https://fleektech.co.ke',
    status: 'live',
    featured: false,
  },
  {
    name: 'stariz.b12sites.com',
    description: 'Portfolio site for Stariz — a creative agency or personal brand.',
    longDescription: 'A visually stunning portfolio website with immersive 3D elements and smooth scroll animations. Designed to showcase creative work in an engaging, memorable way.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Three.js', 'Framer Motion'],
    url: 'https://stariz.b12sites.com',
    status: 'live',
    featured: false,
  },
];

// ==========================================
// 💼 WORK EXPERIENCE
// ==========================================

export const experiences: Experience[] = [
  {
    company: 'Fleek Tech',
    role: 'Co-Founder',
    period: '2022 - Present',
    current: true,
    description: 'Co-founding a tech company focused on innovative solutions for the African market.',
    highlights: [
      'Leading technical direction and architecture decisions',
      'Building a team of talented developers',
      'Delivered 15+ successful projects for clients',
      'Implementing CI/CD pipelines and DevOps practices',
    ],
  },
  {
    company: 'ZFT (Zingri Freelancing Team)',
    role: 'Founder',
    period: '2020 - Present',
    current: true,
    description: 'Independent freelancing practice offering web development, DevOps, and security services.',
    highlights: [
      'Served 50+ clients globally',
      'Specialized in MERN stack and Next.js development',
      'Built and maintained high-traffic applications',
      'Established security consulting practice',
    ],
  },
  {
    company: 'Antiq-log',
    role: 'Lead Supervisor',
    period: '2021 - 2022',
    current: false,
    description: 'Led operations and logistics teams in a fast-paced environment.',
    highlights: [
      'Managed team of 20+ staff members',
      'Implemented process improvements resulting in 30% efficiency gain',
      'Oversaw inventory management systems',
      'Coordinated cross-department workflows',
    ],
  },
  {
    company: 'Telkom Kenya',
    role: 'Cybersecurity Intern',
    period: '2020',
    current: false,
    description: 'Internship focused on network security, threat analysis, and incident response.',
    highlights: [
      'Conducted vulnerability assessments',
      'Participated in incident response drills',
      'Assisted in security audit processes',
      'Learned enterprise security frameworks',
    ],
  },
];

// ==========================================
// 🎓 EDUCATION & CERTIFICATIONS
// ==========================================

export const education: Education[] = [
  {
    institution: 'Zalego',
    degree: 'Certified Ethical Hacker (CEH)',
    year: '2023',
    description: 'Comprehensive ethical hacking and penetration testing certification covering network security, web application security, and social engineering.',
  },
  {
    institution: 'Riara University',
    degree: 'Diploma in Ethical Hacking',
    year: '2022',
    description: 'In-depth study of cybersecurity principles, penetration testing methodologies, and information security management.',
  },
  {
    institution: 'Harvard University',
    degree: 'Computer Science (Online)',
    year: '2021',
    description: 'Harvard CS50 and advanced computer science courses covering algorithms, data structures, and software engineering.',
  },
  {
    institution: 'Various Online Platforms',
    degree: 'Multiple Certifications',
    year: '2019 - Present',
    description: 'AWS, Google Cloud, Kubernetes, React, Next.js, and various other technology certifications from Coursera, Udemy, Pluralsight, and official vendor programs.',
  },
];

// ==========================================
// 🌐 SITE CONFIGURATION
// ==========================================

export const siteConfig = {
  name: 'BAZENGA',
  title: 'ZINGRI MASTER | Full-Stack Developer & Ethical Hacker',
  description: 'Portfolio of ZINGRI MASTER — Full-Stack Developer, DevOps Engineer, and Ethical Hacker based in Nairobi, Kenya.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zingri.dev',
  ogImage: '/og-image.png',
  keywords: [
    'Full-Stack Developer',
    'DevOps Engineer',
    'Ethical Hacker',
    'Nairobi',
    'Kenya',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Cybersecurity',
  ],
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
};

// ==========================================
// 🎯 NAVIGATION ITEMS
// ==========================================

export const navItems = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'About', href: '/#about', icon: 'User' },
  { label: 'Skills', href: '/#skills', icon: 'Code' },
  { label: 'Projects', href: '/#projects', icon: 'Folder' },
  { label: 'Experience', href: '/#experience', icon: 'Briefcase' },
  { label: 'Contact', href: '/#contact', icon: 'Mail' },
];

// ==========================================
// ✨ DEFAULT EXPORT
// ==========================================

export default {
  personalInfo,
  socialLinks,
  skillCategories,
  projects,
  experiences,
  education,
  themeColors,
  siteConfig,
  navItems,
  allSkills,
};
