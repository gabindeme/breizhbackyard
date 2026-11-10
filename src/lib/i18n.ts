import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import fr from "../locales/fr.json";
import { storageGet } from "./safe-storage";

// French (default and fallback) is bundled; English and Breton are loaded on demand,
// so visitors only download the language they use.
const lazyLocales: Record<string, () => Promise<unknown>> = {
  en: () => import("../locales/en.json"),
  br: () => import("../locales/br.json"),
};

i18n
  .use(resourcesToBackend((lng: string) => lazyLocales[lng]?.() ?? Promise.resolve({})))
  .use(initReactI18next)
  .init({
    resources: { fr: { translation: fr } },
    partialBundledLanguages: true,
    supportedLngs: ["fr", "en", "br"],
    lng: storageGet("i18nextLng") || "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
  });

export const listOfLocales = ["fr", "br", "en"];

const localeNames: { [key: string]: string } = {
  en: "English",
  fr: "Français",
  br: "Brezhoneg",
};

export const getFullNamesOfLocales = (locale: string) => {
  return localeNames[locale] || "";
};
