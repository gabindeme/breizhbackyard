import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import fr from "../locales/fr.json";

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
    // Always start in French so the first render matches the pre-rendered HTML;
    // root.tsx switches to the saved language right after hydration.
    lng: "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    // No Suspense: while en/br loads, the page keeps showing the current language.
    react: { useSuspense: false },
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
