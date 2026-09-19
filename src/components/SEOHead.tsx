import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_BASE_URL = "https://breizhbackyard.com";
const DEFAULT_IMAGE = `${DEFAULT_BASE_URL}/assets/banners/OG-banner-1.png`;

export const SEOHead = ({
  title,
  description,
  keywords = "backyard ultra, breizh, bretagne, ultra endurance, trail, course, sport, rennes, running",
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = "Breizh Backyard Ultra — Samedi 15 Mai 2027, Rennes",
  noIndex = false,
  jsonLd,
}: SEOHeadProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // 1. Update HTML lang attribute
    document.documentElement.lang = i18n.language || "fr";

    // 2. Title
    const pageTitle = title
      ? title.includes("Breizh Backyard Ultra")
        ? title
        : `${title} | Breizh Backyard Ultra`
      : "Breizh Backyard Ultra — Ultra-Endurance en Bretagne";
    document.title = pageTitle;

    // Helper to update or create meta tag
    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 3. Basic Meta
    const defaultDesc =
      "Le Breizh Backyard Ultra est une course d'ultra-endurance au format Backyard Ultra organisée en Bretagne. 6,706 km toutes les heures, jusqu'au dernier debout.";
    const metaDesc = description || defaultDesc;
    setMeta('meta[name="description"]', "name", "description", metaDesc);
    setMeta('meta[name="keywords"]', "name", "keywords", keywords);

    // 4. Robots
    const robotsContent = noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    setMeta('meta[name="robots"]', "name", "robots", robotsContent);

    // 5. Canonical URL
    const currentPath = canonicalPath !== undefined ? canonicalPath : window.location.pathname;
    const cleanPath = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
    const fullCanonical = `${DEFAULT_BASE_URL}${cleanPath === "/" ? "" : cleanPath}`;
    setLink("canonical", fullCanonical);

    // 6. Open Graph Meta
    setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", metaDesc);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta('meta[property="og:url"]', "property", "og:url", fullCanonical);
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    setMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", ogImage);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", ogImageAlt);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Breizh Backyard Ultra");

    // Locales mapping for Open Graph
    const langLocaleMap: Record<string, string> = {
      fr: "fr_FR",
      en: "en_US",
      br: "br_FR",
    };
    const currentLocale = langLocaleMap[i18n.language] || "fr_FR";
    setMeta('meta[property="og:locale"]', "property", "og:locale", currentLocale);

    // 7. Twitter Meta
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metaDesc);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", ogImageAlt);

    // 8. JSON-LD Structured Data
    const scriptId = "bbu-jsonld-schema";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(jsonLd);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [title, description, keywords, canonicalPath, ogType, ogImage, ogImageAlt, noIndex, jsonLd, i18n.language]);

  return null;
};
