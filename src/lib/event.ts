// Single source for the event facts used in code.
// Written-out dates stay in the locale files (they differ by language). Static files that can't
// import this (index.html, public/llms*.txt, public/site.webmanifest) are listed in CLAUDE.md.

export const EVENT_START = "2027-05-15T10:00:00+02:00";

export const LOOP_KM = 6.706;
export const LOOP_MILES = 4.167;

export const CITY = "Rennes";
export const REGION = "Bretagne";
export const COUNTRY = "FR";
export const VENUE = "Parc des Gayeulles";
export const GEO = { latitude: 48.13476195656116, longitude: -1.6472409293385937 };

export const SITE_URL = "https://breizhbackyard.com";
export const CONTACT_EMAIL = "contact@breizhbackyard.com";
export const ORGANISER = "Association Delta Events";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/breizhbackyard/",
  facebook: "https://www.facebook.com/people/BreizhBackyard/61588328941008/",
  youtube: "https://www.youtube.com/@breizhbackyard",
  tiktok: "https://www.tiktok.com/@breizhbackyard",
} as const;
