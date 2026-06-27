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
// 🐙 GITHUB CONFIGURATION
// ==========================================

export const githubConfig = {
  username: 'zing254',
  // Optional token for higher rate limits (set in .env.local)
  token: process.env.GITHUB_TOKEN,
};

// GitHub repository interface
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Helper function to fetch GitHub repositories
export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const token = githubConfig.token;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${githubConfig.username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter(repo => !repo.fork); // Filter out forks
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return []; // Return empty array on error
  }
};

// ==========================================
// 🛡️ CYBERSECURITY QUALIFICATIONS
// ==========================================

export interface CybersecurityCertification {
  name: string;
  fullName: string;
  issuer: string;
  year: string;
  description: string;
  credentialId?: string;
  verified: boolean;
  color: keyof ThemeColors; // Reference to themeColors keys
}

export const cybersecurityCertifications: CybersecurityCertification[] = [
  {
    name: 'CEH',
    fullName: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    year: '2023',
     description: 'Validates knowledge in ethical hacking techniques, tools, and methodologies.',
    credentialId: 'CEH-123456',
    verified: true,
    color: 'accent',
  },
  {
    name: 'CISSP',
    fullName: 'Certified Information Systems Security Professional',
    issuer: '(ISC)²',
    year: '2024',
     description: 'The gold standard of security certifications. Deep knowledge in asset security and risk management.',
    credentialId: 'CISSP-345678',
    verified: true,
    color: 'primary',
  },
  {
    name: 'Security+',
    fullName: 'CompTIA Security+',
    issuer: 'CompTIA',
    year: '2023',
     description: 'Foundational cybersecurity skills for IT security professionals.',
    credentialId: 'SEC+-567890',
    verified: true,
    color: 'secondary',
  },
  {
    name: 'CCNP Security',
    fullName: 'Cisco Certified Network Professional Security',
    issuer: 'Cisco',
    year: '2024',
     description: 'Advanced network security skills for securing Cisco networks.',
    credentialId: 'CCNP-SEC-112233',
    verified: true,
    color: 'primary',
  },
  {
    name: 'Fortinet NSE',
    fullName: 'Fortinet Network Security Expert',
    issuer: 'Fortinet',
    year: '2024',
     description: 'Expert-level skills in Fortinet security solutions and network defense.',
    credentialId: 'NSE-445566',
    verified: true,
    color: 'accent',
  },
];

export interface CybersecuritySkill {
  name: string;
  level: number; // 1-100 for visualization
}

export const cybersecuritySkills: CybersecuritySkill[] = [
  { name: 'SIEM', level: 85 },
  { name: 'Firewalls', level: 90 },
  { name: 'IDS/IPS', level: 80 },
  { name: 'FTTH', level: 75 },
  { name: 'Broadband Networks', level: 80 },
  { name: 'Network Security', level: 85 },
  { name: 'Vulnerability Assessment', level: 80 },
  { name: 'Security Operations', level: 75 },
];

// ==========================================
// 👤 PERSONAL INFORMATION
// ==========================================

export const personalInfo = {
  name: 'ZINGRI MASTER',
  title: 'CTO | Senior Full-Stack Developer | Offensive Security Specialist',
  bio: 'Strategic Technical Leader with 7+ years of experience in architecting scalable systems and offensive security. Known as tortoise63 in security circles. Based in Nairobi, Kenya.',
  email: 'zingri_master254@proton.me',
  location: 'Nairobi, Kenya',
  timezone: 'Africa/Nairobi (EAT, UTC+3)',
  avatar: '/images/avatar.svg',
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
    url: 'mailto:zingri_master254@proton.me',
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
  {
    name: 'Cybersecurity',
    icon: 'Shield',
    skills: cybersecuritySkills.map(skill => ({ name: skill.name, level: skill.level })),
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
    longDescription: '**Problem:** Organizations needed an intelligent assistant that could understand context, manage tasks, and integrate with existing tools — without sending sensitive data to third-party APIs.\n\n**Approach:** Built a modular AI engine with plugin architecture. Core NLP pipeline uses fine-tuned transformers for intent classification and entity extraction. Custom skill plugins handle specific domains (calendar, email, code review, threat intel).\n\n**Results:** 95% intent accuracy, 40% reduction in manual task management overhead. Successfully deployed across 3 organizations with 200+ active users.',
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
    role: 'Co-Founder & CTO',
    period: '2022 - Present',
    current: true,
    description: 'Leading technical strategy and architecting enterprise-grade digital ecosystems.',
    highlights: [
      'Architected 10+ high-scale production platforms',
      'Directing technical strategy and team growth',
      'Implemented automated security auditing pipelines',
      'Secured enterprise contracts worth $100k+',
    ],
  },
  {
    company: 'ZFT (Zingri Freelancing Team)',
    role: 'Senior Security Consultant & Full-Stack Lead',
    period: '2019 - 2022',
    current: false,
    description: 'Specialized in high-end web development and security penetration testing.',
    highlights: [
      'Served 50+ clients globally with 100% satisfaction',
      'Lead development on the Shadow AI security engine',
      'Built high-traffic fintech and logistics platforms',
      'Conducted 20+ comprehensive security audits',
    ],
  },
  {
    company: 'Antiq-log',
    role: 'Full-Stack Developer',
    period: '2017 - 2019',
    current: false,
    description: 'Developed and optimized logistics management systems.',
    highlights: [
      'Optimized database queries resulting in 80% speed improvement',
      'Built real-time inventory tracking dashboard',
      'Managed cross-department API integrations',
    ],
  },
];

// ==========================================
// 🎓 EDUCATION & CERTIFICATIONS
// ==========================================

export const education: Education[] = [
  {
    institution: 'Offensive Security',
    degree: 'OSCP (Offensive Security Certified Professional)',
    year: '2023',
    description: 'Hands-on penetration testing and advanced exploit development.',
  },
  {
    institution: '(ISC)²',
    degree: 'CISSP (Certified Information Systems Security Professional)',
    year: '2024',
    description: 'Information security governance and risk management specialist.',
  },
  {
    institution: 'Riara University',
    degree: 'BSc. Computer Science (Honors)',
    year: '2018 - 2022',
    description: 'Focused on Distributed Systems and Cryptography. Graduated First Class.',
  },
];

// ==========================================
// 🌐 SITE CONFIGURATION
// ==========================================

export const siteConfig = {
  name: 'BAZENGA',
  title: 'ZINGRI MASTER | Full-Stack Developer & Cybersecurity Expert',
  description: 'Portfolio of ZINGRI MASTER — Full-Stack Developer, DevOps Engineer, and Cybersecurity Expert with OSCP & CISSP certifications based in Nairobi, Kenya.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zingri.dev',
  ogImage: '/og-image.svg',
  keywords: [
    'Full-Stack Developer',
    'DevOps Engineer',
    'Cybersecurity Expert',
    'OSCP Certified',
    'CISSP Certified',
    'Ethical Hacker',
    'Nairobi',
    'Kenya',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Cybersecurity',
    'Network Security',
    'Penetration Testing',
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

const config = {
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

export default config;
