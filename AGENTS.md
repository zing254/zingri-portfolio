# AGENTS.md — Zingri Portfolio

Next.js 14.2 App Router portfolio site. Deployed at `https://zingri-portfolio-main.vercel.app`.
**Stack**: Next.js 14.2, React 18, TypeScript, TailwindCSS 3.4, Framer Motion 12, Mongoose 9, Resend 3, Vitest 4.
The README claims Next.js 15 / React 19 — it is stale. Trust `package.json`.

## Commands

- `npm run dev` — dev server
- `npm run build` — `next build` (runs type-check + **non-blocking** ESLint warnings only)
- `npm run lint` — `next lint` (`next/core-web-vitals`)
- `npm test` — `vitest run` (single run)
- `npm run test:watch` — `vitest` (watch mode)
- Single test: `npx vitest run src/test/auth.test.ts`

## Critical gotchas

- **Tailwind colors are custom.** Palette in `tailwind.config.ts`: `primary #00d4ff`, `secondary #a855f7`, `accent #39ff14`, `warning #ff6b35`, `background #0a0a0f`, `surface #12121a`, `muted #64748b`. Do NOT use standard Tailwind color names (e.g. `blue-500`) where neon palette is intended.
- **Never build class names dynamically** (e.g. `bg-${color}`) — Tailwind's content scan requires full literal strings. Use `src/lib/tailwind-helpers.ts` (`colorMap` / `getColorClasses`) which maps color names to static class strings. Add new color variants there.
- **`src/lib/blog.ts` uses `fs.readFileSync`/`fs.readdirSync`** — this WILL fail on Vercel serverless (no filesystem access outside build output). Blog content must come from MongoDB. Only use this module during local dev; any PR touching blog display should verify it works without filesystem access.
- **Rate limiter is in-memory only** (`src/lib/rate-limit.ts` uses a local `Map`). Each Vercel cold start gets a fresh empty map, so rate limiting is effectively absent in production. API routes call `rateLimit()` as a no-op.
- **Admin auth stores the raw secret in `sessionStorage`** (`src/app/admin/login/page.tsx:26`). The secret is sent as the `x-admin-secret` header on every request. This is not a real session — any XSS yields full admin access. `verifyAuth()` in `src/lib/auth.ts` now uses `crypto.timingSafeEqual` (added Jul 2026), but the overall scheme is still vulnerable-by-design.
- **`next/font` fetches Google Fonts (Space Grotesk, Inter, JetBrains Mono, Orbitron) at build time.** In networks that block `fonts.gstatic.com` the build fails — this is an environment limitation, not a bug. It builds fine on Vercel.
- **Auth is deny-by-default** — `verifyAuth()` returns `false` when `ADMIN_SECRET` is unset. Admin routes are unreachable without that env var.
- **No `loading.tsx` or `error.tsx`** — pages load synchronously and there is no error boundary. Any render error crashes the entire layout.

## Structure

- `src/lib/config.ts` — single source of truth for all site content: `siteConfig`, `socialLinks`, `skillCategories`, `projects`, `experiences`, `educations`, `navItems`. Also exports `personalInfo` and `config` as default (**default export was removed Jul 2026** — use named imports only). Edit content here, not in components.
- `src/lib/models/` — Mongoose models (`ContactMessage`, `BlogPost`). Require `MONGODB_URI` at runtime.
- `src/app/api/*` — route handlers: `contact`, `messages`, `blog`, `content`, `auth/verify`. All need env vars.
- `src/components/` — UI sections with `aria-labelledby` on each top-level section; Projects modal has `role="dialog"`.
- `src/test/` — Vitest specs (`auth`, `config`, `contact`, `tailwind-helpers`). Setup file `src/test/setup.ts` imports `@testing-library/jest-dom`.
- `src/middleware.ts` — applies CSP + security headers (HSTS, X-Frame-Options, etc.) to all pages except static assets.

## Environment

Actual env vars used by the code (`.env.example` is stale — it describes EmailJS but the code uses Resend):

| Variable | Used in | Notes |
|---|---|---|
| `MONGODB_URI` | `src/lib/mongodb.ts` | Required for DB features |
| `ADMIN_SECRET` | `src/lib/auth.ts`, `src/app/api/auth/verify/route.ts` | Required for admin routes |
| `RESEND_API_KEY` | `src/app/api/contact/route.ts` | Required for contact form email |
| `CONTACT_EMAIL` | `src/app/api/contact/route.ts` | Fallback `zingri@fleektech.co.ke` if unset |
| `NEXT_PUBLIC_SITE_URL` | `src/lib/config.ts` | Fallback `https://zingri.dev` if unset |
| `NEXT_PUBLIC_GA_ID` | `src/lib/config.ts` | Optional |
| `GITHUB_TOKEN` | `src/lib/config.ts` | For API calls in config |

Deploy: `vercel --prod` (configured via `vercel.json` — adds security headers + immutable caching for `/_next/static`).
CSP in `src/middleware.ts` only permits `connect-src` to `api.github.com` and `vercel.live` — adding external API calls requires updating CSP.

## Test quirks

- Auth tests mutate `process.env.ADMIN_SECRET` directly — `vitest` runs tests in parallel by default, which may cause cross-test contamination for these env-dependent tests.
- `src/test/contact.test.tsx` defines a standalone `validateField()` function that duplicates but does NOT test the actual `react-hook-form` logic in the contact component. Changes to form validation must update both.
