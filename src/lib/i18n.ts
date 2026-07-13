import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import br from "../locales/br.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    br: { translation: br },
  },
  lng: localStorage.getItem("i18nextLng") || "fr",
  fallbackLng: "fr",
});

export const listOfLocales = ["fr", "en", "br"];

const localeNames: { [key: string]: string } = {
  en: "English",
  fr: "Français",
  br: "Brezhoneg",
};

export const getFullNamesOfLocales = (locale: string) => {
  return localeNames[locale] || "";
};
