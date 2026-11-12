import { CITY, COUNTRY, EVENT_START, GEO, ORGANISER, REGION, SITE_URL, SOCIAL_LINKS, VENUE } from "@/lib/event";

export const BASE_URL = SITE_URL;
export const LOGO_URL = `${BASE_URL}/assets/logos/logo-white.svg`;
export const BANNER_URL = `${BASE_URL}/assets/banners/OG-banner-1.png`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Breizh Backyard",
  "url": BASE_URL,
  "logo": LOGO_URL,
  "image": BANNER_URL,
  "description": "Organisation officielle de la Breizh Backyard, épreuve d'ultra-endurance au format Backyard Ultra en Bretagne.",
  "sameAs": Object.values(SOCIAL_LINKS),
  "address": {
    "@type": "PostalAddress",
    "addressLocality": CITY,
    "addressRegion": REGION,
    "addressCountry": COUNTRY
  }
};

export const sportsEventSchema = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Breizh Backyard",
  "alternateName": "Breizh Backyard Ultra",
  "description": "La Breizh Backyard est une épreuve d'ultra-endurance au format Backyard Ultra organisée en Bretagne. Les coureurs parcourent une boucle de 6,706 km (4,167 miles) toutes les heures, jusqu'au dernier coureur debout.",
  "startDate": EVENT_START,
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": `Camp de base, ${VENUE}, ${CITY}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": CITY,
      "addressRegion": REGION,
      "addressCountry": COUNTRY
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GEO.latitude,
      "longitude": GEO.longitude
    },
    "hasMap": `https://maps.google.com/?q=${GEO.latitude},${GEO.longitude}`
  },
  "image": [BANNER_URL, LOGO_URL],
  "organizer": {
    "@type": "Organization",
    "name": ORGANISER,
    "url": BASE_URL,
    "logo": LOGO_URL
  },
  "offers": {
    "@type": "Offer",
    "url": `${BASE_URL}/inscriptions`,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/PreOrder",
    "validFrom": "2026-09-01"
  },
  "sport": "Ultra Endurance / Backyard Ultra / Trail Running"
};

export const createFaqSchema = (items: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
});

export const createBreadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.path.startsWith("http") ? item.path : `${BASE_URL}${item.path === "/" ? "" : item.path}`,
  })),
});
