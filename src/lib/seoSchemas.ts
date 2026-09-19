export const BASE_URL = "https://breizhbackyard.com";
export const LOGO_URL = `${BASE_URL}/assets/logos/logo-white.svg`;
export const BANNER_URL = `${BASE_URL}/assets/banners/OG-banner-1.png`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Breizh Backyard Ultra",
  "url": BASE_URL,
  "logo": LOGO_URL,
  "image": BANNER_URL,
  "description": "Organisation officielle du Breizh Backyard Ultra, épreuve d'ultra-endurance au format Backyard Ultra en Bretagne.",
  "sameAs": [
    "https://www.instagram.com/breizhbackyard/",
    "https://www.facebook.com/people/BreizhBackyard/61588328941008/",
    "https://www.youtube.com/@breizhbackyard",
    "https://www.tiktok.com/@breizhbackyard"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rennes",
    "addressRegion": "Bretagne",
    "addressCountry": "FR"
  }
};

export const sportsEventSchema = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Breizh Backyard Ultra",
  "alternateName": "Breizh Backyard Ultra 2027",
  "description": "Le Breizh Backyard Ultra est une épreuve d'ultra-endurance au format Backyard Ultra organisée en Bretagne. Les coureurs parcourent une boucle de 6,706 km (4,167 miles) toutes les heures, jusqu'au dernier coureur debout.",
  "startDate": "2027-05-15T10:00:00+02:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Base de Vie - Rennes",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rennes",
      "addressRegion": "Bretagne",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.13476195656116,
      "longitude": -1.6472409293385937
    },
    "hasMap": "https://maps.google.com/?q=48.13476195656116,-1.6472409293385937"
  },
  "image": [BANNER_URL, LOGO_URL],
  "organizer": {
    "@type": "Organization",
    "name": "Breizh Backyard Ultra",
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
