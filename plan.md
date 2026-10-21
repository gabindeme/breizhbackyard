# Breizh Backyard Ultra: website improvement plan

Written on 2026-10-21 after a full review of the code at commit `0e6ec90` (plus the uncommitted edits in `src/locales/fr.json`). Every finding was checked against the code. File:line references point to that snapshot.

## How to use this plan

- Go phase by phase. **Phase 1 covers things that are broken or legally risky today**, so do it first.
- Each task lists its size (S/M/L), the files involved, the steps, and a **Done when** check. Tick the box once the check passes.
- After each task, `pnpm build` must pass. It's the only automated check today; task 0.2 adds more.
- Some tasks depend on a decision (see the table below). Each decision has a recommended default so work can start; confirm it with the organisers.
- When a task changes the architecture (routing, SEO, forms, i18n), update `CLAUDE.md`.

## Priorities at a glance

1. **The Contact, Sponsors and Bénévoles forms are fake.** They show "success" and send nothing (1.1).
2. **GDPR gaps:** the cookie banner has no "Tout refuser" option, consent never expires, Google gets visitor data without consent, and the privacy policy leaves out Brevo and Google (1.2 to 1.4).
3. **Translation gaps:** French text is typed directly into components, and the sponsor keys are out of sync across the three locales (2.1, 2.2).
4. **Wording varies** for the race name, its article and the camp name, and the event facts are copied into many files (2.3, 2.4).
5. **Crawlers see an empty page:** social networks and AI crawlers don't run JavaScript, so they see no page content and only the home page's meta tags (Phase 3).
6. Cleanup and performance (Phases 4 and 5).

## Decisions to confirm

| # | Question | Recommended default | Task |
|---|---|---|---|
| D1 | How should the three forms send their data? | A Vercel Function that calls the Brevo transactional email API (Brevo and Vercel are already in use) | 1.1 |
| D2 | Keep reCAPTCHA on the newsletter form? | Keep it, but load it only when the visitor starts filling in the form, and name it in the privacy policy | 1.3 |
| D3 | Sponsor tiers (Or / Argent / Bronze) | Delete the leftover keys. The section was removed from the page and from `fr.json` in `16d9853` | 2.1 |
| D4 | Legal pages in English and Breton | Keep them French-only, with a one-line note in en/br. The French text is the binding one | 2.2 |
| D5 | French article for the race | "la Breizh Backyard Ultra": the direction taken in `bb9df81`, and the majority form in `fr.json` | 2.3 |
| D6 | Name of the runners' area | "camp de base": it matches the English "base camp" and is already used 10× in `fr.json` (TODO.md asks for this choice) | 2.3 |
| D7 | Brand name | "Breizh Backyard Ultra" everywhere, with "Breizh Backyard" only as the manifest `short_name` | 2.3 |
| D8 | Do you own the X/Twitter handle `@BreizhBackyard`? | If not, remove `twitter:site` | 2.3 |
| D9 | How to pre-render the pages | React Router 7 framework mode with `prerender` (the site already uses react-router 7.9) | 3.2 |
| D10 | Unused shadcn/ui components | Delete them and their packages; re-add them with the shadcn CLI if ever needed | 4.3 |
| D11 | Web licence for the Hobo font | Confirm you have one. Most digital versions of Hobo are commercial fonts, and this one is embedded in the CSS | 5.5 |

---

## Phase 0: Prep

- [ ] **0.1 Start from a clean tree** (S). Commit or stash the in-progress `fr.json` edits.
- [ ] **0.2 Add a translation-key parity check** (S). Write `scripts/check-locales.mjs`: flatten the nested keys of `fr`, `en` and `br`, print every key that exists in one file but not another, and exit with code 1 on any mismatch. Add a `"check:i18n"` script to `package.json`.
  **Done when:** running it on today's files reports exactly the 18 `sponsors_page.niveaux.*` / `sponsors_page.avantages.*` keys that are in en/br but not fr.

## Phase 1: Broken or legally risky (do first)

### 1.1 Make the Contact, Sponsors and Bénévoles forms send for real (M, D1)

All three submit handlers fake a delay with `setTimeout`, show a success screen, and send nothing:
`src/pages/Contact/index.tsx:57-64`, `src/pages/Sponsors/index.tsx:31-38`, `src/pages/Benevoles/index.tsx:36-60` (it even says `// Simulate API call`). Every message, sponsor request and volunteer application is silently lost.

- [ ] **Same day, if the real fix can't ship right away:** remove the fake success. Show `contact@breizhbackyard.com` and a `mailto:` button with the subject and body pre-filled, or hide the forms.
- [ ] Add a Vercel Function `api/contact.ts` at the repo root. It should:
  - accept `{ type: "contact" | "sponsor" | "benevole", ...fields }`;
  - validate on the server (required fields, email format, maximum lengths);
  - silently drop the request when a hidden honeypot field is filled in;
  - send a notification email to contact@breizhbackyard.com through Brevo (`POST https://api.brevo.com/v3/smtp/email`, `api-key` header), with `replyTo` set to the visitor. The sender must be a verified Brevo sender.

  Keep the key in a Vercel environment variable `BREVO_API_KEY`, never in client code.
- [ ] Optional, for volunteers: also add the person to a Brevo "Bénévoles" list (`POST /v3/contacts`) so they can be emailed later.
- [ ] Stop the SPA rewrite in `vercel.json` from catching the API: `{ "source": "/((?!api/).*)", "destination": "/index.html" }`.
- [ ] In the three pages, `fetch("/api/contact", …)`. Show success only on a 2xx response. Otherwise show a translated error message that also gives the email address. Add the new strings to all three locales.
- [ ] Test with `vercel dev` (needs the Vercel CLI and the environment variable).

**Done when:** on a preview deployment, each of the three forms delivers an email to the inbox, and submitting while offline shows an error, not a success.

### 1.2 Cookie banner: refusing must be as easy as accepting (S)

- The banner's first layer (`src/components/customs/cookie-banner.tsx`) offers only "Personnaliser" (line 161) and "Tout accepter" (line 190). `declineAll` exists in the context but nothing calls it. The CNIL's cookie guidelines require refusing to be as visible and as easy as accepting.
- The privacy policy says consent is kept for at most 13 months (`src/pages/PolitiqueConfidentialite/index.tsx:297`). `src/providers/cookie-context.tsx` saves a timestamp (line 87) but never checks it, so consent never expires.

- [ ] Add a "Tout refuser" button that calls `declineAll`, with the same size and visual weight as "Tout accepter". Add `cookies.btn_refuse` to the three locales.
- [ ] In `cookie-context.tsx`, treat a stored consent with no timestamp, or one older than 13 months, as undecided, so the banner shows again.

**Done when:** the first layer shows Refuse, Customise and Accept, and setting the stored timestamp to 14 months ago brings the banner back.

### 1.3 Stop sending visitor data to Google without consent (S, D2)

- `src/pages/Inscriptions/index.tsx:53-62` loads Google reCAPTCHA Enterprise as soon as the page opens, whatever the visitor chose in the cookie banner.
- `index.html` loads the Inter font from `fonts.googleapis.com` on every page, which sends every visitor's IP address to Google. A German court ruled this a GDPR violation (LG München I, 20 Jan 2022).

- [ ] Host Inter yourself. Add `@fontsource/inter`, import weights 300 to 800 in `src/main.tsx` (the font name stays "Inter", so no style changes), and remove the three Google Fonts `<link>` tags from `index.html`.
- [ ] Load the reCAPTCHA script on the first `focus` or `input` inside `#sib-form`, not when the page mounts. Keep the site key in one constant (it's written twice, at lines 58 and 100).
- [ ] Leave Vercel Analytics and Speed Insights behind the consent check as they are. They're already gated correctly.
- [ ] Note for later: when the hidden Parcours page comes back, its Strava embed (`src/pages/Parcours/index.tsx:31`) also needs consent (click to load).

**Done when:** in a fresh browser profile, DevTools › Network shows no request to google.com, gstatic.com or googleapis.com on any page until you interact with the newsletter form.

### 1.4 Make the privacy policy match what the site actually does (S, plus review by the organisers)

`src/pages/PolitiqueConfidentialite/index.tsx` names Nextrun and Vercel as recipients (lines 318-346), but it:

- doesn't name Brevo (newsletter today, and the forms after 1.1);
- doesn't name Google (reCAPTCHA, and fonts until 1.3 is done);
- says the contact and volunteer forms collect a phone number (line 215), but neither form asks for one;
- doesn't mention transfers outside the EU (Vercel and Google are US companies).

- [ ] Name Brevo (Sendinblue SAS, France) as a processor for the newsletter and form emails.
- [ ] Name Google reCAPTCHA (purpose: anti-spam; transfer to the US).
- [ ] Make the "data collected" list match the real forms.
- [ ] Keep the "13 months" wording only once 1.2 implements it.
- [ ] Have the organisers check the final text, since it's legal content.

**Done when:** every third party that shows up in the Network tab is named in the policy.

## Phase 2: Content and translation correctness

### 2.1 Bring the locale files back in sync (S, D3)
- [ ] Delete `sponsors_page.niveaux` and `sponsors_page.avantages` from `en.json` and `br.json`. They've been unused since `16d9853`: the Sponsors page now only uses `header`, `dossier` and `contact`.

**Done when:** `pnpm check:i18n` passes.

### 2.2 Move the French text that's typed into components into the locale files (M, D4)
- [ ] SEO: move the `title` and `description` props of `<SEOHead>` in all 12 pages into new keys `seo.<page>.title` and `seo.<page>.description`. These keys can be reused in Phase 3.
- [ ] Move the breadcrumb names (`createBreadcrumbSchema([...])` in 10 pages, including "Accueil" ×10) into the locales.
- [ ] Legal pages: `MentionsLegales` has 2 `t()` calls and `PolitiqueConfidentialite` has 5; the rest is typed French. Per D4, add a short "available in French only" note for en/br, or translate them.
- [ ] `src/components/customs/navbar.tsx:450` has "Départ : Samedi 15 mai 2027 — 10h00" typed in (note the lowercase "mai"; elsewhere it's "Mai").
- [ ] `src/pages/InfosPratiques/index.tsx:306-317` has the `CheckItem` texts, "Direction de course", "Médecin de course" and "À venir" typed in.
- [ ] `src/pages/Inscriptions/index.tsx:29-46` has Brevo's validation messages and `LOCALE = 'fr'` fixed in French. Use `t()` and `i18n.language`.
- [ ] Image descriptions: `Home/index.tsx:467` ("Aperçu du parcours") and the navbar's "Drapeau Breton".

**Done when:** in English, no page shows French text (apart from the legal pages, if D4 is kept) and every browser-tab title is in English.

### 2.3 Use the same wording everywhere (S, D5 to D8)
- [ ] **Article (D5).** Masculine forms are still in:
  - `SEOHead.tsx:67-68` (default description, "Le …");
  - `seoSchemas.ts` ("Le …", "du …");
  - `index.html` (`twitter:description`, "Le …"), while `description` and `og:description` already say "La";
  - the SEO descriptions of Home, FAQ, Bénévoles, Bienvenue, Contact, Inscriptions and Mentions légales;
  - one "du Breizh Backyard Ultra" in `fr.json`.

  Find them with `grep -rnE "\b(Le|le|du) Breizh Backyard" src public index.html`.
- [ ] **Camp name (D6).** `fr.json` mixes "zone de vie" (11), "camp de base" (10) and "base de vie" (1). Other copies: `InfosPratiques/index.tsx:306`, `seoSchemas.ts:38` ("Base de Vie - Rennes") and `public/llms-full.txt`.
- [ ] **Brand name (D7).** `public/site.webmanifest` uses "Breizh Backyard" for its `name` and description, and `en.json` uses the short form 11 times.
- [ ] **Title separator.** `index.html` has used " - " since `bb9df81`, but `SEOHead` and the pages use " — ". Pick one.
- [ ] **`twitter:site` (D8).** `index.html:52` points to `@BreizhBackyard`, but no X account appears in the footer or in `organizationSchema.sameAs`.
- [ ] **Miles.** The locales say 4,1667 / 4.1667, while `llms*.txt` and `seoSchemas.ts` say 4,167. Use one precision.
- [ ] **Organiser (optional).** The legal publisher is "Association Delta Events" (`MentionsLegales`), but the structured data names "Breizh Backyard Ultra" as `organizer` (`seoSchemas.ts:53`). Consider naming the association as organiser and keeping the brand as the event name.

**Done when:** each of these greps returns only the chosen form.

### 2.4 Keep the event facts in one place (S)
- [ ] Create `src/lib/event.ts` with the start time (`"2027-05-15T10:00:00+02:00"`), the loop distance (`6.706` km, plus miles), the city, the venue (Parc des Gayeulles), the GPS coordinates, the contact email and the social links.
- [ ] Use it in:
  - `countdown.tsx:25` (the default) and the `Countdown` props in `footer.tsx:212` and `Home/index.tsx:189`;
  - `seoSchemas.ts`, `SEOHead.tsx` and `Concept/index.tsx:68` (`KM_PER_LOOP`);
  - the footer's social links and `organizationSchema.sameAs`;
  - the `mailto:` links (`footer.tsx:192`, `Contact/index.tsx:105`).
- [ ] Leave the written-out dates in the locales, since they differ by language. The static files (`index.html`, `public/llms*.txt`, `site.webmanifest`) can't import TypeScript: keep their list in `CLAUDE.md` and grep them when a fact changes. After Phase 3, the `<head>` content moves into TypeScript and can use the constants.

**Done when:** `grep -rn "2027-05-15" src` matches only `src/lib/event.ts`.

### 2.5 Keep the thank-you page out of search results (S)
- [ ] `/bienvenue` is the after-signup page and nothing on the site links to it. Yet it's listed in `public/sitemap.xml:30` and doesn't set `noIndex`. Add `noIndex` to its `<SEOHead>` (`Bienvenue/index.tsx:18`) and remove it from the sitemap.

**Done when:** the page's robots tag says `noindex, nofollow` and the sitemap no longer lists it.

## Phase 3: Pre-render the pages (SEO, social previews, AI crawlers)

**Why:** `SEOHead` sets the meta tags in the browser after JavaScript runs.

- Social-network crawlers (Facebook, WhatsApp, LinkedIn, X) and most AI crawlers don't run JavaScript, so they only see `index.html`.
- As a result, every shared link shows the home page's preview.
- AI crawlers, which `robots.txt` explicitly invites, see an empty `<div id="root">`.
- Google does run JavaScript, but later and less reliably.

Links to the home page already preview correctly. This matters most before big announcements, such as sharing `/inscriptions` or `/benevoles` when registration opens.

### 3.1 Make the app safe to render at build time (S; useful even without Phase 3)
- [ ] `src/lib/i18n.ts:13`: don't read `localStorage` when the module loads. Start with `lng: "fr"` and switch to the saved language after the first render. This also avoids a mismatch between the pre-rendered HTML and the first render in the browser.
- [ ] `cookie-context.tsx`: read the stored consent after the first render, and show no banner until it has been read.
- [ ] `countdown.tsx:26`: the starting value comes from the current time, which differs between build time and the visitor's visit. Show placeholders until the component has rendered in the browser.
- [ ] Run the 404 high score and `Aurora` (WebGL) only in the browser. Check that `ogl` doesn't touch `window` when it's imported.

### 3.2 Move to React Router framework mode with pre-rendering (L, D9)
- [ ] Add `@react-router/dev` and create `react-router.config.ts` with `appDirectory: "src"`, `ssr: false` and `prerender` set to every public route.
- [ ] Create `src/root.tsx`, the document shell. Move the static `<head>` from `index.html` into it and add `<Meta/>`, `<Links/>`, `<Scripts/>` and `<ScrollRestoration/>`.
- [ ] Create `src/routes.ts` with the same route tree as `src/router/routes.tsx`: Home on its own, the other pages under a layout route that replaces `LayoutWrapper`, and the hidden pages still left out.
- [ ] Give each page an `export default` and a `meta` export with the title, description, canonical link, OG/Twitter tags, and structured data through `"script:ld+json"`, using the `seo.*` keys from 2.2. Then delete `SEOHead.tsx`.
- [ ] Vercel: set the output directory to `build/client`. See 3.3 for the rewrite.
- [ ] Check each step against the React Router docs for the installed version (pre-rendering and SPA mode), since these APIs changed between 7.x releases.
- [ ] Fallback if this migration is too heavy: `vite-react-ssg`. It needs the same 3.1 groundwork, and in both cases the meta tags must be rendered as elements, not set in effects (effects don't run at build time).

**Done when**, on a preview deployment:
- `curl -s https://<preview>/concept | grep -o '<title>[^<]*'` prints the Concept title;
- opengraph.xyz shows page-specific previews for `/inscriptions` and `/benevoles`;
- navigation and the language switch still work, with no hydration errors in the console.

### 3.3 Return a real 404 status (S)
- [ ] Today `vercel.json` sends every path to `index.html`, so unknown URLs return HTTP 200 (a "soft 404"). The NotFound page's `noindex` only appears once JavaScript runs. Once every route is pre-rendered, drop the catch-all rewrite and pre-render NotFound as `404.html` so Vercel serves it with a 404 status.

**Done when:** `curl -sI https://<preview>/nimportequoi` returns 404, and the browser shows the 404 page.

## Phase 4: Robustness and cleanup

- [ ] **4.1 Guard every browser-storage access** (S). Add a small `safeStorage` helper in `src/lib/` (get/set wrapped in try/catch) and use it everywhere:
  - `src/lib/i18n.ts:13` runs when the module loads. If the browser blocks site data, it throws and the whole site fails to start.
  - `navbar.tsx:40`.
  - `NotFound/index.tsx:580` reads storage in the game's draw code, on every frame. Read it once instead.

  This is already covered if 3.1 is done first.
- [ ] **4.2 Scroll to the top when navigating to Home** (S).
  - Home sits outside `LayoutWrapper`, so the wrapper's scroll reset doesn't run on the way to `/`.
  - Coming from the footer of a long page will very likely open Home part-way down. This isn't confirmed in a browser yet, so check first.
  - Fix it with a single `<ScrollToTop/>` in `App`, or get it for free from `<ScrollRestoration/>` in 3.2.
  - Also correct the misleading comment at `src/router/routes.tsx:95`: Home does render the navbar and footer, it just renders them itself.
- [ ] **4.3 Remove dead code and unused packages** (S, D10). An import scan starting from `src/main.tsx` shows these are never imported:
  - **Files:**
    - `src/components/ui/*` (button, dropdown-menu, separator, sheet, sonner);
    - `src/lib/utils.ts`;
    - `src/components/customs/language-changer.tsx` (the navbar has its own language menu);
    - `src/components/customs/theme-changer.tsx` and `src/providers/theme-provider.tsx`.
  - **Packages used only by those files:** `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `sonner`, `next-themes`.
  - **Dark-mode CSS:** the `.dark { … }` block (`src/styles/index.css` around line 1200) and `@custom-variant dark` (line 12). Nothing ever adds the `dark` class.
  - **`tw-animate-css`:** check whether any page still uses its classes.
  - **shadcn config:** if shadcn goes, remove `components.json` too and update `CLAUDE.md`.

  Keep Parcours, Résultats and Galerie, which are parked on purpose. These files aren't in the production bundle (unused code is dropped at build time), so this is about upkeep, not speed.

  **Done when:** `pnpm build` passes and the scan finds no unused files apart from the hidden pages.
- [ ] **4.4 Tooling** (S).
  - Rename the package from `vite-project` to `breizhbackyard`, and move `prettier` to `devDependencies`.
  - `typescript-eslint` and `globals` are installed without ESLint itself. Either add `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, an `eslint.config.js` and a `lint` script, or remove the two packages.
  - Add `"check": "tsc -b && pnpm lint && node scripts/check-locales.mjs"`.
- [ ] **4.5 Clean up the signup page code** (S), in `src/pages/Inscriptions/index.tsx`. 17 lines use `any` for the Brevo and reCAPTCHA globals. Declare those globals once in `src/vite-env.d.ts` (`interface Window { … }`).
- [ ] **4.6 One shared page header and the colour variables** (M, gradually).
  - `PageHeader` (green gradient plus wave SVG) is copy-pasted, with small variations, into 12 pages. Create `src/components/customs/page-header.tsx` and use it everywhere.
  - Brand colours are typed as hex values in inline styles (`#277956` ×104, `#1a2e22` ×49, `#F5C92C` ×42…), even though `index.css` defines `--bbu-*` variables. Switch to `var(--bbu-…)` whenever you touch a file; no big rewrite.
- [ ] **4.7 Only if Phase 3 is postponed: stop needless head rewrites** (S). Pages build their `jsonLd` arrays during render, so `SEOHead`'s effect (deps at `SEOHead.tsx:125`) rewrites the `<head>` on every re-render, for example on each FAQ accordion click. Build the schemas outside the components or memoise them.

## Phase 5: Performance (measure before and after each change)

- [ ] **5.1 Baseline** (S). Run Lighthouse in mobile mode on production for `/`, `/concept` and `/inscriptions`. Write down LCP, TBT and the amount of JavaScript transferred.
- [ ] **5.2 Load only the visitor's language** (S). The entry chunk (285 kB, 91 kB gzipped) holds React DOM's client code and all three locale files, about 109 kB of JSON. Load the locales on demand with dynamic imports (for example `i18next-resources-to-backend` with ``import(`../locales/${lng}.json`)``), keeping `fr` as the fallback.
- [ ] **5.3 Pause the Aurora animation when it isn't visible** (S). `src/components/Aurora.tsx` runs a WebGL loop that never pauses, even after the visitor scrolls past the hero, and it ignores `prefers-reduced-motion`. Pause it with an IntersectionObserver when it's off-screen, and draw a single still frame when reduced motion is requested. `ogl` itself is only in the Home chunk (64 kB), which is fine.
- [ ] **5.4 `motion` on every page** (S, low gain). The 123 kB `motion` package is preloaded on every page because the cookie banner, mounted in `main.tsx`, imports it. The pages use it too, so lazy-loading the banner only helps if Lighthouse shows real startup cost.
- [ ] **5.5 Move the Hobo font out of the CSS** (S, D11). It's embedded as base64 in `src/styles/index.css`: 38.8 kB of the 83 kB stylesheet, which blocks rendering. Move it to `public/fonts/hobo.woff2`, point `@font-face` at that file, and add `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
- [ ] **5.6 Proper icon files** (S). The favicon, the `apple-touch-icon` and the manifest icon all point to `logo-white.svg`. iOS ignores SVG touch icons, and `"purpose": "any maskable"` crops a logo that has no padding. Add PNGs: a 180×180 apple-touch-icon, 192 and 512 sizes, a padded 512 maskable icon, and a 32 px or `.ico` favicon fallback. This also covers the favicon check in TODO.md.

## Phase 6: Content backlog (organisers; from TODO.md)

- Real photos with alt text, real information instead of AI-written text, a rewritten FAQ with real answers, one camp name everywhere (D6 → 2.3), and a video trailer on the landing page (low priority).
- The pre-ship checklist in `TODO.md` still applies after this plan: i18n, responsiveness, the email and signup flow (which now includes the three forms from 1.1), GDPR, links, OG previews, favicon and page speed.

---

## Appendix A: Checked and fine (don't "fix")

- `6,706 km` in fr/br and `6.706 km` in en are each correct for their language.
- `logo-white.svg` is a full-colour logo (the version for light backgrounds), not a white one.
- Vercel Analytics and Speed Insights only load after the visitor accepts analytics, and refusing deletes cookies (`cookie-context.tsx`).
- Every `<img>` has an `alt`; the only problem is that a few are typed in French (2.2).
- The newsletter form's labels and placeholders are translated. Only Brevo's validation messages are typed in French (2.2).
- The Strava embed script is only in the hidden Parcours page.
- `pnpm build` passes with no type errors at `0e6ec90`.

## Appendix B: How the findings were checked (re-run these to track progress)

- **Unused files and packages:** an import scan from `src/main.tsx` that follows static and dynamic imports and skips commented-out lines.
- **What's in each bundle:** run `pnpm build`, then grep `dist/assets/*.js` for marker strings (locale text, `webgl`, `bbu_cookie_consent`). `dist/index.html` lists the preloaded chunks.
- **Locale parity:** flatten each locale's keys and compare them (task 0.2 turns this into a script).
- **Third-party requests:** DevTools › Network in a fresh browser profile.
