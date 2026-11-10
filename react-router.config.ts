import type { Config } from "@react-router/dev/config";

// Static site: every public page is rendered to HTML at build time (SEO, link previews, AI crawlers),
// then hydrated in the browser. "/404" pre-renders the catch-all route; the build script copies it to
// build/client/404.html, which Vercel serves with a 404 status for unknown URLs.
export const PRERENDERED_PATHS = [
  "/",
  "/concept",
  "/infos-pratiques",
  "/inscriptions",
  "/faq",
  "/sponsors",
  "/contact",
  "/benevoles",
  "/bienvenue",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/404",
];

export default {
  appDirectory: "src",
  ssr: false,
  prerender: PRERENDERED_PATHS,
} satisfies Config;
