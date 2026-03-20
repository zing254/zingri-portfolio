# 🤝 Contributing to BAZENGA

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the BAZENGA portfolio project.

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Standards](#-code-standards)
- [Commit Messages](#-commit-messages)
- [Pull Request Guidelines](#-pull-request-guidelines)
- [Reporting Issues](#-reporting-issues)
- [Style Guide](#-style-guide)

---

## 💜 Code of Conduct

By participating in this project, you agree to maintain a welcoming, respectful, and harassment-free environment for everyone.

**Be:**
- Respectful and considerate in discussions
- Collaborative and helpful
- Focused on the work and constructive in feedback
- Understanding of different skill levels and perspectives

**Don't:**
- Engage in personal attacks or harassment
- Discriminate based on race, gender, religion, etc.
- Spam or derail technical discussions
- Share private information without consent

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0 or pnpm >= 8.0.0
Git >= 2.30.0
```

### Setup

1. **Fork the repository**

   Click the "Fork" button on GitHub or run:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/zing254/portfolio.git
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Create your environment file**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

---

## 🔄 Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/ai-chat-integration` |
| `fix/` | Bug fixes | `fix/mobile-nav-z-index` |
| `docs/` | Documentation | `docs/update-readme` |
| `refactor/` | Code refactoring | `refactor/smooth-scroll-logic` |
| `style/` | Styling changes | `style/update-color-scheme` |
| `perf/` | Performance improvements | `perf/optimize-3d-render` |
| `test/` | Adding/updating tests | `test/add-component-tests` |

### Workflow Steps

1. **Sync with upstream** before starting work:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** — write code, tests, docs

4. **Test locally**:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

5. **Commit your changes** (see commit message guidelines)

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** on GitHub

---

## 📐 Code Standards

### TypeScript

- Use **strict mode** at all times
- Avoid `any` — use proper types
- Use interfaces for object shapes
- Export types explicitly when needed

```typescript
// ✅ Good
interface Project {
  name: string;
  description: string;
  tech: string[];
}

// ❌ Avoid
const project: any = { ... };
```

### React Components

- Use functional components with hooks
- Follow the composition pattern
- Keep components small and focused
- Extract reusable logic into custom hooks

```typescript
// ✅ Good
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}

// ❌ Avoid - too much logic in component
export function ProjectCard({ project, onEdit, onDelete, ... }) {
  // 200+ lines
}
```

### File Organization

```
src/
├── app/                 # Next.js App Router
│   └── page.tsx        # Page components
├── components/
│   ├── ui/             # Generic UI components
│   ├── sections/       # Page sections
│   └── three/          # Three.js components
└── lib/
    └── config.ts       # Configuration
```

### Import Order

```typescript
// 1. React / Next.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { Github, Twitter, Mail } from 'lucide-react';

// 3. Internal imports
import { projects, themeColors } from '@/lib/config';
import { ProjectCard } from '@/components/ui/ProjectCard';

// 4. Types (if separate file)
import type { Project } from '@/lib/types';
```

---

## 💬 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no code change |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `chore` | Maintenance, dependencies |

### Examples

```bash
# Feature
git commit -m "feat(skills): add animated skill bars"

# Bug fix
git commit -m "fix(contact): resolve form submission error"

# Documentation
git commit -m "docs(readme): update deployment instructions"

# Refactor
git commit -m "refactor(config): extract type definitions"

# Style
git commit -m "style(hero): adjust gradient animation speed"
```

---

## 📮 Pull Request Guidelines

### PR Title

Format: `[TYPE] Brief description (#issue)`

Examples:
- `feat: Add AI chatbot integration`
- `fix: Resolve mobile navigation z-index issue`
- `docs: Update deployment guide`

### PR Description Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots (if applicable)

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] I have updated relevant documentation
- [ ] My changes generate no new warnings
- [ ] Tests pass locally
```

### Review Process

1. Automated checks must pass (lint, type-check, build)
2. At least one review approval required
3. All conversations resolved
4. Branch up-to-date with main

---

## 🐛 Reporting Issues

### Before Submitting

- Search existing issues first
- Check if the issue exists in similar form
- Verify with latest version

### Issue Template

```markdown
## Bug Description
Clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Screenshots (if applicable)

## Environment
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.0.0]

## Additional Context
Any other context about the problem.
```

---

## 🎨 Style Guide

### TailwindCSS Classes

- Use logical ordering (positioning → sizing → spacing → typography → colors)
- Group related classes with comments for complex components
- Use Tailwind's built-in dark mode classes

```tsx
// ✅ Good
<div className={cn(
  "relative flex flex-col",
  "w-full max-w-md",
  "p-6 rounded-xl",
  "bg-surface/80 backdrop-blur",
  "border border-primary/20"
)}>

// ❌ Avoid - inline styles mixed with Tailwind
<div style={{ backgroundColor: '#111' }} className="p-6">
```

### Animations

- Use Framer Motion for component animations
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion`

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Colors

Use CSS variables from the theme:

```css
/* Use Tailwind's text utilities */
<p className="text-primary">   /* Cyan */
<p className="text-secondary"> /* Purple */
<p className="text-accent">    /* Neon Green */

/* Or direct values */
<div className="bg-[#00ffff]"> /* Cyan */
```

---

## 🙏 Questions?

Feel free to open an issue for questions or reach out via:
- Email: hello@zingri.dev
- GitHub Issues: [Open an issue](https://github.com/zing254/portfolio/issues)

---

**Happy coding!** ⚡
