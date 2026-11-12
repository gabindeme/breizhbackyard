import i18n from "i18next";
import type { MetaDescriptor } from "react-router";
import { BANNER_URL, createBreadcrumbSchema, createFaqSchema } from "@/lib/seoSchemas";
import { SITE_URL } from "@/lib/event";

export type SeoPage =
  | "home"
  | "concept"
  | "infos"
  | "inscriptions"
  | "faq"
  | "sponsors"
  | "contact"
  | "benevoles"
  | "bienvenue"
  | "mentions"
  | "privacy"
  | "notfound";

const OG_LOCALES: Record<string, string> = { fr: "fr_FR", en: "en_US", br: "br_FR" };
const KEYWORDS = "backyard ultra, breizh, bretagne, ultra endurance, trail, course, sport, rennes, running";
const BRAND = "Breizh Backyard";

interface PageMetaOptions {
  page: SeoPage;
  /** Canonical path. Omit for pages without a canonical URL (404). */
  path?: string;
  jsonLd?: Array<Record<string, unknown>>;
  /** Adds a breadcrumb (Home > this page) to the structured data. */
  breadcrumb?: boolean;
  noIndex?: boolean;
}

/**
 * Builds the <head> tags for a route's `meta` export: title, description, robots, canonical,
 * Open Graph, Twitter card and JSON-LD. Pre-rendered at build time (in French), and re-evaluated
 * in the browser on navigation and language changes.
 */
export function pageMeta({ page, path, jsonLd = [], breadcrumb = true, noIndex = false }: PageMetaOptions): MetaDescriptor[] {
  const t = i18n.t.bind(i18n);
  const rawTitle = t(`seo.${page}.title`);
  const title = rawTitle.includes(BRAND) ? rawTitle : `${rawTitle} | ${BRAND}`;
  const description = t(`seo.${page}.description`);
  const imageAlt = t("seo.og_image_alt");
  const url = path !== undefined ? `${SITE_URL}${path === "/" ? "" : path}` : undefined;
  const lang = i18n.resolvedLanguage ?? "fr";

  const schemas = [...jsonLd];
  if (breadcrumb && path && path !== "/") {
    schemas.push(
      createBreadcrumbSchema([
        { name: t("seo.home.breadcrumb"), path: "/" },
        { name: t(`seo.${page}.breadcrumb`), path },
      ]),
    );
  }

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: KEYWORDS },
    {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    ...(url ? [{ tagName: "link", rel: "canonical", href: url }, { property: "og:url", content: url }] : []),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: BRAND },
    { property: "og:locale", content: OG_LOCALES[lang] ?? "fr_FR" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: BANNER_URL },
    { property: "og:image:secure_url", content: BANNER_URL },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: BANNER_URL },
    { name: "twitter:image:alt", content: imageAlt },
    ...schemas.map((schema) => ({ "script:ld+json": schema })),
  ];
}

/** FAQPage schema from the FAQ page's translated questions. */
export function faqPageSchema() {
  const data = i18n.t("faq_page.data", { returnObjects: true }) as { items?: { q: string; a: string }[] }[];
  const items = Array.isArray(data) ? data.flatMap((c) => (c.items ?? []).map((i) => ({ question: i.q, answer: i.a }))) : [];
  return createFaqSchema(items);
}

/** FAQPage schema from the questions on the Concept page. */
export function conceptFaqSchema() {
  const items = [1, 2, 3, 4, 5].map((n) => ({
    question: i18n.t(`concept_page.faq.q${n}`),
    answer: i18n.t(`concept_page.faq.a${n}`),
  }));
  return createFaqSchema(items);
}
