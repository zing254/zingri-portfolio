# AGENTS.md — Zingri Portfolio

Next.js portfolio site (App Router). Production deploy: `https://zingri-portfolio-main.vercel.app`.
Actual stack: **Next.js 14.2, React 18, TypeScript, TailwindCSS 3.4, Framer Motion, Mongoose, Resend, Vitest**.
The README is partly stale — it claims Next.js 15 / React 19. Trust `package.json` and `next.config.js`.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (`next build`); also runs lint + type-check
- `npm run lint` — `next lint` (uses `next/core-web-vitals`)
- `npm test` — runs **Vitest** (`vitest run`, once). Watch mode: `npm run test:watch`
- Single test file: `npx vitest run src/test/auth.test.ts`

## Critical gotchas

- **Tailwind colors are custom, not defaults.** Palette in `tailwind.config.ts`: `primary #00d4ff`, `secondary #a855f7`, `accent #39ff14`, `warning #ff6b35`, `background #0a0a0f`, `surface #12121a`, `muted #64748b`. Do not add standard Tailwind color names (e.g. `blue-500`) where the neon palette is intended.
- **Never build class names dynamically** (e.g. `bg-${color}`) — Tailwind's content scan only keeps full literal strings, so dynamic classes get purged and silently produce no CSS. Use `src/lib/tailwind-helpers.ts` (`colorMap` / `getColorClasses`) which maps a color name to pre-written static class strings. Add new color variants there, not inline.
- **`next/font` fetches Google Fonts (Space Grotesk, Inter, JetBrains Mono, Orbitron) at build time.** In networks that block `fonts.gstatic.com` the build fails on font fetch. This is an environment limitation, not a code bug — it builds fine on Vercel.
- **Auth is deny-by-default.** `src/lib/auth.ts` `verifyAuth()` returns `false` when `ADMIN_SECRET` is unset. Admin routes (`/admin`) are unreachable until that env var exists.

## Structure

- `src/lib/config.ts` — single source of truth for all site content: `siteConfig` (name "Zingri Master"), `socialLinks`, `skillCategories`, `projects`, `experiences`, `educations`, `navItems`. Edit content here, not in components.
- `src/lib/models/` — Mongoose models (`ContactMessage`, `BlogPost`). Require `MONGODB_URI` at runtime.
- `src/app/api/*` — route handlers: `contact`, `messages`, `blog`, `content`, `auth/verify`. All need env vars (`MONGODB_URI`, `RESEND_API_KEY`, `CONTACT_EMAIL`).
- `src/components/` — UI sections; each top-level section has `aria-labelledby` and the Projects modal is a `role="dialog"`.
- `src/test/` — Vitest specs (`auth`, `config`, `contact`, `tailwind-helpers`). Setup file `src/test/setup.ts` imports `@testing-library/jest-dom`.

## Environment / deploy

- Required env vars (see `.env.example`): `MONGODB_URI`, `ADMIN_SECRET`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_SITE_URL`. `NEXT_PUBLIC_GA_ID` is optional.
- Deploy: `vercel --prod` (already configured via `vercel.json`, which adds security headers + immutable caching for `/_next/static`). CSP in `src/middleware.ts` permits `connect-src` to `api.github.com` and `vercel.live` only — adding other external API calls requires updating the CSP.
- `public/resume.pdf` is served by the Hero "Download Resume" button — keep that file present.
