# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/info website for **Breizh Backyard Ultra** (BBU), a Backyard Ultra race in Rennes, Bretagne (Saturday 15 May 2027, 10:00). Static React SPA deployed on Vercel at https://breizhbackyard.com. The only backend is one Vercel Function (`api/contact.ts`) for the site forms; the newsletter signup is a third-party Brevo form.

## Commands

Package manager is **pnpm**.

- `pnpm dev`: Vite dev server
- `pnpm build`: type-check (`tsc -b`) then production build into `dist/`.
- `pnpm lint`: ESLint (typescript-eslint + react-hooks; the parked Parcours/Galerie/Resultats pages are ignored).
- `pnpm check`: `tsc -b` + lint + `check:i18n`. Run it before committing; there are no tests.
- `pnpm format`: Prettier (140 cols, double quotes, trailing commas)
- `pnpm check:i18n`: reports translation keys missing from any of fr/en/br (exit 1 on mismatch)

## Architecture

- **Stack**: Vite 7, React 19, TypeScript, React Router 7, Tailwind CSS v4 (via `@tailwindcss/vite`, no tailwind config file), `motion/react` for animation, react-i18next. Path alias `@/` → `src/`.
- **Entry**: `src/main.tsx` wraps the app in `BrowserRouter` and `CookieProvider`, and imports `src/lib/i18n.ts` for its side effects.
- **Routing** (`src/router/routes.tsx`): every page is lazy-loaded, and each page module uses a **named export** (`export const Concept`), mapped with `.then((m) => ({ default: m.X }))`. `/` (Home) sits **outside** `LayoutWrapper`: it renders its own `<Navbar />` inside the full-screen hero and its own `<Footer />`. All other routes are nested under `LayoutWrapper`, which adds Navbar and Footer. `ScrollToTop` (in `App`) resets the scroll on every route change, Home included. The routes and imports for some pages (Parcours, Resultats, Galerie) are commented out on purpose. Their page files are kept so they can be re-enabled later.
- **Pages** live in `src/pages/<Name>/index.tsx`. Page and URL names are in French (`/infos-pratiques`, `/mentions-legales`, …). Site-wide components are in `src/components/customs/`.
- **i18n**: three locales in `src/locales/{fr,en,br}.json` (French is the default and fallback, `br` = Breton). French is bundled; `en` and `br` are loaded on demand (`i18next-resources-to-backend` in `src/lib/i18n.ts`), and `main.tsx` wraps the app in `<Suspense>` while a language loads. Keys are nested per page (`home.*`, `concept_page.*`, `infos_page.*`, `inscriptions_page.*`, …). Any text change needs to go into **all three** files. The chosen language is stored in `localStorage` under `i18nextLng`. Always go through `src/lib/safe-storage.ts` for `localStorage` (it can throw when site data is blocked).
- **Cookie consent / analytics** (`src/providers/cookie-context.tsx`): GDPR consent is stored in `localStorage` under `bbu_cookie_consent`. Vercel Analytics and Speed Insights are mounted only after the user accepts analytics. Don't add tracking outside this gate.
- **Newsletter** (`src/pages/Inscriptions`): injects the Brevo form script by hand, and uses a MutationObserver to detect Brevo's success message. `confirmation-email.html` at the repo root is the Brevo confirmation email template. The site does not use it at runtime.
- **SEO**: each page renders `<SEOHead>` (`src/components/SEOHead.tsx`), which sets title, meta, OG/Twitter, canonical and JSON-LD in the DOM by hand. Reusable schema.org objects and builders (`sportsEventSchema`, `createFaqSchema`, `createBreadcrumbSchema`, …) are in `src/lib/seoSchemas.ts`. Static SEO/GEO files are in `public/`: `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.
- **Vercel** (`vercel.json`): SPA rewrite of every path except `/api/*` to `index.html`, plus security and cache headers.

## Conventions and gotchas

- **Styling** mixes Tailwind classes with many inline `style={{}}` objects that use hard-coded brand hex colors. Brand tokens are defined as CSS variables in `src/styles/index.css` (`--bbu-green-dark: #277956`, `--bbu-teal`, `--bbu-yellow: #F5C92C`, `--bbu-off-white: #EFEFEF`, …). The same file defines shared classes (`.page-container`, `.section-subtitle`, `.page-header-inner`). Display headings use the custom `Hobo` font, served from `public/fonts/hobo.woff2` and preloaded in `index.html`; Inter comes from `@fontsource/inter`. App icons (PNG) are in `public/icons/`. Every page except Home uses the shared `PageHeader` (`src/components/customs/page-header.tsx`; `variant="legal"` for the legal pages). Prefer `var(--bbu-…)` over hex values in code you touch.
- **Event facts** (start time, loop distance, venue, GPS, contact email, social links, organiser) live in `src/lib/event.ts`; import them rather than retyping. Written-out dates stay in the locale JSONs (they differ by language). Static files can't import TypeScript, so when a fact changes also grep and update `index.html` meta, `public/llms*.txt` and `public/site.webmanifest`.
- **Wording**: "la Breizh Backyard Ultra" (feminine) in French, always the full brand name ("Breizh Backyard" only as the manifest/iOS short name), "camp de base" for the runners' area, " | " as the title separator.
- **SEO text** is translated: each page passes `t("seo.<page>.title")` / `t("seo.<page>.description")` to `<SEOHead>` (which appends " | Breizh Backyard Ultra") and uses `seo.<page>.breadcrumb` in its breadcrumb schema. The legal pages stay French-only and show `<FrenchOnlyNote />` in en/br.
- When adding or removing a public page, also update `public/sitemap.xml` and `public/llms*.txt`.
- **Forms**: Contact, Sponsors and Bénévoles post to the Vercel Function `api/contact.ts` (via `src/lib/submit-form.ts`), which emails the organisers through the Brevo transactional API and sends the visitor a confirmation in their language. The confirmation strings are under `emails.*` in the locale files (the function imports the JSON). It needs `BREVO_API_KEY` in Vercel (set for all environments). Each form has a hidden honeypot field (`website`, see `form-extras.tsx`); the confirmation email never repeats what the visitor typed. `api/` is type-checked by `tsconfig.api.json`, and `vercel.json` keeps `/api/*` out of the SPA rewrite.
- **Third parties and consent**: Inter is self-hosted via `@fontsource/inter`. The newsletter form has no captcha (removed: the Google key was a score-based Enterprise key while the Brevo form expected a checkbox, so every signup failed); Brevo's double opt-in covers fake signups. The site makes no requests to Google. Cookie consent expires after 13 months (`cookie-context.tsx`). Any new third-party request must also be named in `PolitiqueConfidentialite`.
- `plan.md` is the prioritised improvement plan from the October 2026 review. Tick tasks there as they're done.
- `TODO.md` holds the current content backlog and the pre-ship checklist (i18n completeness, responsiveness, email/signup flow, GDPR, OG preview, favicon).
