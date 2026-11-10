import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import br from "../locales/br.json";
import { storageGet } from "./safe-storage";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    br: { translation: br },
  },
  lng: storageGet("i18nextLng") || "fr",
  fallbackLng: "fr",
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
