// src/context/LanguageProvider.tsx
import React, { createContext, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import messages from "../locales";

type Locale = "es" | "en" | "it" | "pt";

interface LanguageContextProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  locale: "es",
  setLocale: () => {},
});

const getBrowserLocale = (supportedLocales: Locale[], fallback: Locale): Locale => {
  const browserLang = navigator.language.split("-")[0] as Locale; // ej: "es-ES" → "es"
  return supportedLocales.includes(browserLang) ? browserLang : fallback;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supportedLocales: Locale[] = ["es", "en", "it", "pt"];
  const fallback: Locale = "en";

  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && supportedLocales.includes(saved)) return saved;

    return getBrowserLocale(supportedLocales, fallback);
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
