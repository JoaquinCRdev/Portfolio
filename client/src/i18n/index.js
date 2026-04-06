import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { uiText } from "../data/uiText";

const storedLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem("app-language")
    : null;

i18n.use(initReactI18next).init({
  resources: {
    es: { ui: uiText.es },
    en: { ui: uiText.en },
    de: { ui: uiText.de },
  },
  lng: storedLanguage || "en",
  fallbackLng: "en",
  ns: ["ui"],
  defaultNS: "ui",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;