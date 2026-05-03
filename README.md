# █▀▄ █▀▀ █▀ ▀█▀ █▀█ █▀█ ▄▀█ █▀▀ █▀█ █▀
# █▄▀ ██▄ ▄█  █  █▄█ █▀▄ █▀█ █▄█ █▀▄ ▄█
# ════════════════════════════════════════
#   Full-Stack Developer | DevOps Engineer | Ethical Hacker
#   Building the future of tech from Nairobi, Kenya.
# ════════════════════════════════════════

# BAZENGA — ZINGRI'S DIGITAL NEXUS

[![Portfolio Status](https://img.shields.io/badge/status-online-00ff88?style=for-the-badge)](https://zingri.dev)
[![Build Status](https://img.shields.io/badge/build-passing-00ffff?style=for-the-badge)](https://github.com/zing254/portfolio)
[![License](https://img.shields.io/badge/license-MIT-ff00ff?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.4-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## ⚡ ABOUT THE SYSTEM

> **"Full-Stack Developer, DevOps Engineer, Ethical Hacker. Building the future of tech from Nairobi, Kenya."**

Welcome to my digital domain. This portfolio isn't just a showcase — it's a fully immersive experience designed to reflect the intersection of creativity, code, and cyberpunk aesthetics. Every interaction is engineered to demonstrate technical mastery while maintaining an unmistakable visual identity.

Built with **Next.js 15**, **TypeScript**, and **TailwindCSS**, this project embodies modern web development practices: server-side rendering, optimized performance, responsive design, and seamless animations powered by **Framer Motion**.

---

## 🎯 CORE FEATURES

| Feature | Description |
|---------|-------------|
| 🌑 **Dark Mode Cyberpunk UI** | Immersive neon-on-dark aesthetic with cyan, purple, and neon green accents |
| ⚡ **Lightning Performance** | Next.js 15 App Router with optimized loading and SSR |
| 🎨 **Animated Interactions** | Smooth page transitions and micro-interactions via Framer Motion |
| 📱 **Fully Responsive** | Desktop, tablet, and mobile optimized layouts |
| 🔒 **Secure by Design** | Environment-based configuration, no exposed secrets |
| 🌐 **SEO Optimized** | Meta tags, OpenGraph, and structured data ready |
| 🎭 **3D Elements** | Three.js powered visuals for enhanced immersion |
| 💾 **Dynamic Content** | Type-safe configuration system for easy updates |

---

## 🛠 TECH STACK

### Core Framework
- **Next.js 15** — React framework with App Router, Server Components, and Server Actions
- **TypeScript 5.4** — Type-safe development for robust, maintainable code
- **React 19** — UI library powering the component architecture

### Styling & Animation
- **TailwindCSS 3.4** — Utility-first CSS framework for rapid styling
- **Framer Motion 11** — Production-ready animations and gestures
- **Three.js / React Three Fiber** — 3D graphics and immersive visuals
- **Lucide React** — Crisp, scalable iconography

### Backend & Database
- **Node.js** — JavaScript runtime for server-side logic
- **PostgreSQL** — Relational database for persistent storage
- **MongoDB** — Document database for flexible data models
- **Redis** — In-memory caching for high-performance data access

### DevOps & Cloud
- **Docker** — Containerization for consistent environments
- **Kubernetes** — Container orchestration at scale
- **AWS** — Cloud infrastructure and services
- **Linux** — Server operating system mastery
- **CI/CD** — Automated pipelines for continuous integration/deployment

### Security & Specialized
- **Ethical Hacking** — Penetration testing and security assessments
- **CEH Certification** — Certified Ethical Hacker credential
- **OWASP** — Web application security standards
- **TensorFlow / PyTorch** — Machine learning frameworks
- **NLP** — Natural Language Processing capabilities

---

## 🚀 GETTING STARTED

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0 or pnpm >= 8.0.0 or yarn >= 1.22.0
Git >= 2.30.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/zing254/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=BAZENGA
NEXT_PUBLIC_DEVELOPER_NAME=ZINGRI MASTER

# Contact Form / Email
EMAIL_SERVICE_ID=your_emailjs_service-id
EMAIL_TEMPLATE_ID=your_emailjs-template-id
EMAIL_PUBLIC_KEY=your_emailjs-public-key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Social Links Override (optional)
NEXT_PUBLIC_GITHUB_URL=https://github.com/zing254
```

### Development

```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Lint and type-check
npm run lint
npm run type-check
```

---

## 📁 PROJECT STRUCTURE

```
portfolio/
├── public/                  # Static assets
│   ├── images/             # Optimized images
│   └── favicon.ico         # Site favicon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── sections/      # Page sections
│   │   └── three/          # 3D/Three.js components
│   └── lib/
│       └── config.ts      # Site configuration ⚙️
├── .env.example           # Environment template
├── tailwind.config.ts    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies
```

---

## 🌍 DEPLOYMENT

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Docker

```dockerfile
# Build image
docker build -t bazenga-portfolio:latest .

# Run container
docker run -d -p 3000:3000 \
  --env-file .env.production \
  bazenga-portfolio:latest
```

### Manual Server Deployment

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start npm --name "bazenga" -- start
pm2 save
pm2 startup
```

### Environment-Specific Variables

| Environment | Variable File | Notes |
|------------|---------------|-------|
| Development | `.env.local` | Full debugging enabled |
| Staging | `.env.staging` | Mirror production settings |
| Production | `.env.production` | Optimized, minified |

---

## 🔧 CONFIGURATION

The site configuration lives in `src/lib/config.ts`. Update this file to customize:

- Personal information and bio
- Social media links
- Skills and expertise areas
- Project showcase entries
- Work experience timeline
- Education and certifications
- Theme colors and branding

---

## 🤝 CONTRIBUTING

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/cyberpunk-feature`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to the branch (`git push origin feature/cyberpunk-feature`)
5. Open a Pull Request

### Code Standards

- TypeScript strict mode enforced
- ESLint + Prettier for consistent formatting
- Component tests required for new features
- Update documentation for any API changes

---

## 📝 CHANGELOG

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

---

## 📜 LICENSE

```
MIT License

Copyright (c) 2024 ZINGRI MASTER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  <strong>// END OF LINE //</strong>
</p>

<p align="center">
  <a href="https://github.com/zing254">GitHub</a> •
  <a href="mailto:hello@zingri.dev">Email</a> •
  <a href="#">LinkedIn</a> •
  <a href="#">Twitter</a>
</p>

<p align="center">
  <sub>Built with ⚡ by ZINGRI MASTER • Nairobi, Kenya 🇰🇪</sub>
</p>
