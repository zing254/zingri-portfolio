# Portfolio Enhancements Design Specification
**Date:** 2026-05-27
**Author:** Opencode AI Assistant

## Overview
This document outlines the design for enhancing the Zingri Master portfolio website with:
1. Hybrid tech cursor replacement
2. GitHub projects integration
3. Cybersecurity qualifications display
4. Contact information update

## Approvals
- [x] Cursor Replacement Design
- [x] GitHub Integration Design  
- [x] Cybersecurity Qualifications Design
- [x] Contact Information Update Design

---

### 1. Hybrid Tech Cursor Replacement Design

**Current State:** The portfolio uses a circle blob cursor that changes based on hover/click states.

**Proposed Design:** Replace with a hybrid tech cursor combining terminal and cyberpunk elements that shows three distinct states:
- **Active:** Steady thin vertical line (4px width) with subtle glow and pulse animation
- **Loading:** Horizontal bars expanding from center (width animation from 0 to full width)
- **Triggered:** Radial pulse from center point with expanding/contracting circle

**Technical Implementation:**
- Modify `/src/components/CustomCursor.tsx`
- Maintain existing trail effect functionality
- Preserve desktop-only media query constraint (≥1024px)
- Keep hover/click state detection logic
- Use Framer Motion for smooth animations
- Utilize CSS variables for theme colors (primary: cyan, secondary: purple, accent: neon green)

**User Interaction Flow:**
1. Default: Thin vertical line with subtle glow (active state)
2. Hover over interactive elements: Slight expansion + maintained glow (hover state)
3. Click/mouse down: Line contracts slightly (click state)
4. Content loading: Horizontal bars expand from center (loading state)
5. Specific triggers: Radial pulse animation (triggered state)

**Approval Required:** [ ]

---

### 2. GitHub Projects Integration Design

**Current State:** Static projects array with hardcoded data in `/src/components/Projects.tsx`

**Proposed Design:** Dynamic GitHub projects integration that fetches and displays all public repositories from the user's GitHub account.

**Technical Implementation:**
- Add GitHub configuration to `/src/lib/config.ts` (username, optional token)
- Create helper function to fetch GitHub repositories
- Modify `/src/components/Projects.tsx` to:
  - Replace static projects array with dynamic data fetching
  - Implement loading and error states
  - Map GitHub repo data to project card format
  - Preserve existing UI/UX components (TiltCard, filters, etc.)
  - Add skeleton loading UI

**Data Mapping:**
- GitHub `name` → Project `name`
- GitHub `description` → Project `description` 
- GitHub `language` + `topics` → Project `tech` array
- GitHub `html_url` → Project `url` and `github` fields
- GitHub `stargazers_count` → Project `stars`
- GitHub `archived`, `fork`, `pushed_at` → Project `status` (live/development/archived)
- Manual configuration or tag-based → Project `featured` boolean

**User Experience:**
- Maintain existing filtering capabilities (All, Frontend, Backend, DevOps, AI/ML)
- Preserve card tilt and hover effects
- Keep live demo and code linking functionality
- Show loading state while fetching data
- Display error state if API request fails
- Respect rate limiting with optional token configuration

**Approval Required:** [ ]

---

### 3. Cybersecurity Qualifications Display Design

**Current State:** Education component shows general certifications; Skills section has limited security-related skills.

**Proposed Design:** Combination approach integrating cybersecurity qualifications across the portfolio:
- Enhanced Skills section with dedicated cybersecurity skills
- Prominent Cybersecurity Certifications subsection in Education component
- Updated metadata to reflect cybersecurity expertise

**Technical Implementation:**

**Skills Section Updates (`/src/components/Skills.tsx`):**
- Add new "Cybersecurity" skill category or distribute skills across relevant existing categories
- Add skills with appropriate proficiency levels:
  - SIEM (Security Information and Event Management): Level 85
  - Firewalls: Level 90
  - IDS/IPS (Intrusion Detection/Prevention Systems): Level 80
  - FTTH (Fiber to the Home): Level 75
  - Broadband Networks: Level 80
  - Additional relevant skills based on user background

**Education Component Updates (`/src/components/Education.tsx`):**
- Add prominent "Cybersecurity Certifications" subsection
- Display certifications with visual badges using shield/lock icons
- Include detailed information for each certification:
  - CEH (Certified Ethical Hacker) - Offensive Security
  - CISSP (Certified Information Systems Security Professional) - (ISC)²
  - Security+ (CompTIA Security+) - CompTIA
  - CCNP Security (Cisco Certified Network Professional Security) - Cisco
  - Fortinet NSE (Fortinet Network Security Expert) - Fortinet
  - OSCP (Offensive Security Certified Professional) - Already present
- Show verification status and credential IDs on hover/tooltip
- Apply appropriate color coding (red/orange tones for security theme)
- Maintain existing animations and interactions

**Metadata Updates (`/src/layout.tsx`):**
- Update keywords to include cybersecurity terms
- Enhance description to highlight security expertise

**Approval Required:** [ ]

---

### 4. Contact Information Update Design

**Current State:** Contact information shows placeholder email and potentially outdated social links.

**Proposed Design:** Update all contact information to reflect the user's specified details.

**Technical Implementation:**
- Modify `/src/lib/config.ts`:
  - Update `personalInfo.email` to "zingri_master254@proton.me"
  - Add field or update bio to reference "tortoise63" handle if desired
  - Verify and update `socialLinks` GitHub URL if needed
- Update `/src/components/Contact.tsx`:
  - Replace placeholder email links with actual email
  - Update any displayed email addresses in the component
  - Ensure form submission functionality remains intact
- Optionally update `/src/layout.tsx` metadata if needed for SEO

**Specific Changes:**
- Email: zingri_master254@proton.me (replacing current placeholder)
- Alias/Handle: tortoise63 (to be incorporated appropriately)
- GitHub: Verify https://github.com/zing254 is correct
- Other links: Review and update as needed

**Approval Required:** [ ]

---

## Implementation Dependencies
All planned enhancements use existing dependencies:
- React 19
- Next.js 15
- TypeScript 5.4
- TailwindCSS 3.4
- Framer Motion 11
- Lucide React
- No new packages required

## Next Steps
Upon approval of all design sections, I will:
1. Create implementation plan using the `writing-plans` skill
2. Execute the implementation according to the approved plans
3. Run linting and type-checking to ensure code quality
4. Verify all enhancements work correctly

Please review each section and indicate your approval by checking the corresponding boxes.
