// ⚙️ ZINGRI MASTER CONFIGURATION
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

// ==========================================
// 🐙 GITHUB REPO CACHING
// ==========================================

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
let cachedRepos: GitHubRepo[] | null = null;
let cacheTimestamp = 0;

// Helper function to fetch GitHub repositories
export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const now = Date.now();

  // Return cached data if still valid
  if (cachedRepos && (now - cacheTimestamp) < CACHE_DURATION_MS) {
    return cachedRepos;
  }

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
      {
        headers,
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    const filtered = repos.filter(repo => !repo.fork);

    // Update cache
    cachedRepos = filtered;
    cacheTimestamp = now;

    return filtered;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    // Return stale cache if available, otherwise empty array
    return cachedRepos ?? [];
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
    url: 'https://linkedin.com/in/zingri',
    icon: 'Linkedin',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/zingri',
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
    name: 'STARIZ AI Assistant',
    description: 'Full offline JARVIS-like AI with voice, RAG, memory, agent, and autonomous learning.',
    longDescription: '**Problem:** Need for a fully offline AI assistant that could handle voice commands, maintain context, and learn autonomously without cloud dependencies.\n\n**Approach:** Built a modular AI architecture with local LLM inference, RAG pipeline for knowledge retrieval, and custom memory system. Voice synthesis runs entirely on-device.\n\n**Results:** Fully functional offline AI assistant with natural voice interaction, persistent memory, and autonomous task execution.',
    tech: ['TypeScript', 'Python', 'Next.js', 'Local LLM', 'RAG', 'Voice Synthesis'],
    url: 'https://build-stariz-assistant.vercel.app',
    github: 'https://github.com/zing254/build-stariz-assistant',
    status: 'live',
    featured: true,
  },
  {
    name: 'Fleek AI',
    description: 'AI-powered platform for intelligent automation and natural language processing.',
    longDescription: '**Problem:** Businesses needed an AI platform that could understand context, automate workflows, and integrate with existing tools.\n\n**Approach:** Developed a multi-model AI system with plugin architecture for extensibility. Core engine handles NLP, task planning, and execution.\n\n**Results:** Deployed across multiple clients with 90% task automation rate and seamless integration capabilities.',
    tech: ['TypeScript', 'Next.js', 'AI/ML', 'API Integration', 'React'],
    url: 'https://fleek-ai-phi.vercel.app',
    github: 'https://github.com/zing254/fleek-AI',
    status: 'live',
    featured: true,
  },
  {
    name: 'Chama OS',
    description: 'Financial management platform for chama groups and investment circles.',
    longDescription: '**Problem:** Chama groups needed a digital solution to track contributions, manage investments, and ensure transparency.\n\n**Approach:** Built a secure financial platform with real-time tracking, automated reminders, and comprehensive reporting dashboard.\n\n**Results:** Streamlined financial operations for multiple chama groups with automated reconciliation and transparent reporting.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Real-time Updates'],
    url: 'https://project-5djm1.vercel.app',
    github: 'https://github.com/zing254/chama-os',
    status: 'live',
    featured: true,
  },
  {
    name: 'Kenya Overwatch System',
    description: 'Road safety monitoring system using computer vision and real-time analytics.',
    longDescription: '**Problem:** Kenyan roads needed intelligent monitoring to detect violations and improve safety.\n\n**Approach:** Implemented computer vision models trained on local traffic patterns, integrated with real-time alerting system.\n\n**Results:** Successfully deployed monitoring capabilities across key intersections with automated violation detection.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Real-time Analytics', 'AWS'],
    github: 'https://github.com/zing254/KENYA_OVERWATCH-SYSTEM',
    status: 'live',
    featured: true,
  },
  {
    name: 'Paid WiFi Hotspot',
    description: 'WiFi payment system for monetizing internet access in public spaces.',
    longDescription: '**Problem:** Businesses needed a way to monetize WiFi access while providing reliable service.\n\n**Approach:** Developed a captive portal system with payment integration, usage tracking, and bandwidth management.\n\n**Results:** Deployed in multiple locations with seamless payment processing and usage analytics.',
    tech: ['HTML', 'JavaScript', 'Payment Integration', 'Network Management'],
    github: 'https://github.com/zing254/paid-wifi-hotspot',
    status: 'live',
    featured: false,
  },
  {
    name: 'Falcon Frontend',
    description: 'Modern web application frontend with responsive design and smooth animations.',
    longDescription: 'A sleek, performant frontend application built with modern web technologies. Features responsive design, optimized animations, and clean architecture.',
    tech: ['TypeScript', 'React', 'TailwindCSS', 'Framer Motion'],
    url: 'https://frontend-nu-weld-64.vercel.app',
    github: 'https://github.com/zing254/falcon-frontend',
    status: 'live',
    featured: false,
  },
  {
    name: 'Charlie Frontend',
    description: 'Feature-rich web application with dynamic UI and real-time capabilities.',
    longDescription: 'A comprehensive web application featuring dynamic user interfaces, real-time data synchronization, and optimized performance.',
    tech: ['JavaScript', 'React', 'Real-time Features', 'Responsive Design'],
    url: 'https://charlie-frontend-five.vercel.app',
    github: 'https://github.com/zing254/charlie-frontend',
    status: 'live',
    featured: false,
  },
  {
    name: 'Bravo Frontend',
    description: 'High-performance web application with modern design patterns.',
    longDescription: 'A performant web application implementing modern design patterns, optimized rendering, and clean code architecture.',
    tech: ['JavaScript', 'React', 'Performance Optimization', 'Modern UI'],
    url: 'https://bravo-frontend-virid.vercel.app',
    github: 'https://github.com/zing254/bravo-frontend',
    status: 'live',
    featured: false,
  },
  {
    name: 'Alphamobi Web',
    description: 'Corporate website for Alphamobi Technologies with modern design.',
    longDescription: 'A professional corporate website featuring modern design, smooth animations, and optimized performance for business presentation.',
    tech: ['TypeScript', 'Next.js', 'TailwindCSS', 'Framer Motion'],
    url: 'https://alphamobi.vercel.app',
    github: 'https://github.com/zing254/Alphamobitech-web',
    status: 'live',
    featured: false,
  },
  {
    name: 'Z-Mobile',
    description: 'Mobile-first web application with native-like experience.',
    longDescription: 'A responsive mobile application delivering native-like experience through progressive web app technology and optimized mobile UI.',
    tech: ['TypeScript', 'React', 'PWA', 'Mobile Optimization'],
    url: 'https://z-empire-mobile.vercel.app',
    github: 'https://github.com/zing254/z-mobile',
    status: 'live',
    featured: false,
  },
  {
    name: 'Bazenga Dashboard',
    description: 'Admin dashboard for managing applications and analytics.',
    longDescription: 'A comprehensive admin dashboard featuring real-time analytics, user management, and customizable widgets for business intelligence.',
    tech: ['TypeScript', 'React', 'Dashboard', 'Analytics'],
    github: 'https://github.com/zing254/bazenga-dashboard',
    status: 'development',
    featured: false,
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
  name: 'Zingri Master',
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
