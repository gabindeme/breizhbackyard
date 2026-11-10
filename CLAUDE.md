# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/info website for **Breizh Backyard Ultra** (BBU), a Backyard Ultra race in Rennes, Bretagne (Saturday 15 May 2027, 10:00). React site deployed on Vercel at https://breizhbackyard.com, pre-rendered to static HTML at build time and hydrated in the browser. The only backend is one Vercel Function (`api/contact.ts`) for the site forms; the newsletter signup is a third-party Brevo form.

## Commands

Package manager is **pnpm**.

- `pnpm dev`: React Router dev server (`react-router dev`)
- `pnpm build`: `tsc -b`, then `react-router build` (pre-renders every page into `build/client/`), then `scripts/postbuild.mjs` (turns the pre-rendered `/404` into `build/client/404.html`).
- `pnpm preview`: serves `build/client` (note: unlike Vercel, it doesn't serve `404.html` for unknown URLs).
- `pnpm lint`: ESLint (typescript-eslint + react-hooks; the parked Parcours/Galerie/Resultats pages are ignored).
- `pnpm check`: `tsc -b` + lint + `check:i18n`. Run it before committing; there are no tests.
- `pnpm format`: Prettier (140 cols, double quotes, trailing commas)
- `pnpm check:i18n`: reports translation keys missing from any of fr/en/br (exit 1 on mismatch)

## Architecture

- **Stack**: Vite 7, React 19, TypeScript, React Router 7 in framework mode (`@react-router/dev`, `ssr: false` + `prerender`), Tailwind CSS v4 (via `@tailwindcss/vite`, no tailwind config file), `motion/react` for animation, react-i18next. Path alias `@/` → `src/`.
- **Entry**: `src/root.tsx` is the document shell (the old `index.html`): static `<head>` tags, font/CSS imports, `<Meta/>`, `<Links/>`, `<ScrollRestoration/>`, `<Scripts/>`, plus `CookieProvider` and the cookie banner around `<Outlet/>`. `react-router.config.ts` sets `appDirectory: "src"` and lists the pre-rendered paths (`PRERENDERED_PATHS`): **add any new page there**.
- **Routing** (`src/routes.ts`): Home is an `index` route; every other page sits under the `routes/layout.tsx` layout (Navbar + Footer); `*` is the 404. Home renders its own Navbar (inside the full-screen hero) and Footer. Each file in `src/routes/` is a thin route module: `export { Page as default } from "@/pages/Page"` plus a `meta` export. Pages keep their **named exports**. `<ScrollRestoration/>` resets the scroll on navigation and restores it on back/forward. Parcours, Resultats and Galerie are parked on purpose: their page files are kept but not routed. Import router APIs from `react-router` (there is no `react-router-dom`).
- **Pages** live in `src/pages/<Name>/index.tsx`. Page and URL names are in French (`/infos-pratiques`, `/mentions-legales`, …). Site-wide components are in `src/components/customs/`.
- **i18n**: three locales in `src/locales/{fr,en,br}.json` (French is the default and fallback, `br` = Breton). French is bundled; `en` and `br` are loaded on demand (`i18next-resources-to-backend` in `src/lib/i18n.ts`), with `useSuspense: false`. i18n always starts in French so the first render matches the pre-rendered HTML; `root.tsx` switches to the saved language right after hydration. Keys are nested per page (`home.*`, `concept_page.*`, `infos_page.*`, `inscriptions_page.*`, …). Any text change needs to go into **all three** files. The chosen language is stored in `localStorage` under `i18nextLng`. Always go through `src/lib/safe-storage.ts` for `localStorage` (it can throw when site data is blocked).
- **Cookie consent / analytics** (`src/providers/cookie-context.tsx`): GDPR consent is stored in `localStorage` under `bbu_cookie_consent`. Vercel Analytics and Speed Insights are mounted only after the user accepts analytics. Don't add tracking outside this gate.
- **Newsletter** (`src/pages/Inscriptions`): injects the Brevo form script by hand, and uses a MutationObserver to detect Brevo's success message. `confirmation-email.html` at the repo root is the Brevo confirmation email template. The site does not use it at runtime.
- **SEO**: each route's `meta` export calls `pageMeta()` (`src/lib/meta.ts`), which returns title, description, robots, canonical, OG/Twitter and JSON-LD (`script:ld+json`). They are rendered into the HTML at build time (in French) and recomputed in the browser on navigation and language change. Reusable schema.org objects and builders (`sportsEventSchema`, `createFaqSchema`, `createBreadcrumbSchema`, …) are in `src/lib/seoSchemas.ts`. Static SEO/GEO files are in `public/`: `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.
- **Vercel** (`vercel.json`): `outputDirectory: build/client`, security and cache headers, no rewrites. Every page is a real HTML file; unknown URLs get `404.html` with an HTTP 404.

## Conventions and gotchas

- **Styling** mixes Tailwind classes with many inline `style={{}}` objects that use hard-coded brand hex colors. Brand tokens are defined as CSS variables in `src/styles/index.css` (`--bbu-green-dark: #277956`, `--bbu-teal`, `--bbu-yellow: #F5C92C`, `--bbu-off-white: #EFEFEF`, …). The same file defines shared classes (`.page-container`, `.section-subtitle`, `.page-header-inner`). Display headings use the custom `Hobo` font, served from `public/fonts/hobo.woff2` and preloaded in `root.tsx`; Inter comes from `@fontsource/inter`. App icons (PNG) are in `public/icons/`. Every page except Home uses the shared `PageHeader` (`src/components/customs/page-header.tsx`; `variant="legal"` for the legal pages). Prefer `var(--bbu-…)` over hex values in code you touch.
- **Event facts** (start time, loop distance, venue, GPS, contact email, social links, organiser) live in `src/lib/event.ts`; import them rather than retyping. Written-out dates stay in the locale JSONs (they differ by language). Static files can't import TypeScript, so when a fact changes also grep and update `public/llms*.txt` and `public/site.webmanifest`.
- **Wording**: "la Breizh Backyard Ultra" (feminine) in French, always the full brand name ("Breizh Backyard" only as the manifest/iOS short name), "camp de base" for the runners' area, " | " as the title separator.
- **SEO text** is translated: `pageMeta({ page })` reads `seo.<page>.title` (it appends " | Breizh Backyard Ultra"), `seo.<page>.description` and `seo.<page>.breadcrumb`. The legal pages stay French-only and show `<FrenchOnlyNote />` in en/br.
- When adding or removing a public page: add a route module in `src/routes/`, register it in `src/routes.ts` and in `PRERENDERED_PATHS`, add its `seo.*` keys, and update `public/sitemap.xml` and `public/llms*.txt`.
- **Pre-render safety**: components render once in Node at build time. Don't touch `window`, `document` or `localStorage` during render, and keep the first browser render identical to the HTML: read storage, the current time or anything visitor-specific in a `useEffect` (see `cookie-context.tsx`, `countdown.tsx`, the 404 high score).
- **Forms**: Contact, Sponsors and Bénévoles post to the Vercel Function `api/contact.ts` (via `src/lib/submit-form.ts`), which emails the organisers through the Brevo transactional API and sends the visitor a confirmation in their language. The confirmation strings are under `emails.*` in the locale files (the function imports the JSON). It needs `BREVO_API_KEY` in Vercel (set for all environments). Each form has a hidden honeypot field (`website`, see `form-extras.tsx`); the confirmation email never repeats what the visitor typed. `api/` is type-checked by `tsconfig.api.json`.
- **Third parties and consent**: Inter is self-hosted via `@fontsource/inter`. The newsletter form has no captcha (removed: the Google key was a score-based Enterprise key while the Brevo form expected a checkbox, so every signup failed); Brevo's double opt-in covers fake signups. The site makes no requests to Google. Cookie consent expires after 13 months (`cookie-context.tsx`). Any new third-party request must also be named in `PolitiqueConfidentialite`.
- `plan.md` is the prioritised improvement plan from the October 2026 review. Tick tasks there as they're done.
- `TODO.md` holds the current content backlog and the pre-ship checklist (i18n completeness, responsiveness, email/signup flow, GDPR, OG preview, favicon).
