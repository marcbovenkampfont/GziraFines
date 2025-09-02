import React, { useContext } from "react";
import { LanguageContext } from "../../context/languageProvider";
import "./LanguageSelector.scss"

const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useContext(LanguageContext);

  return (
    <div className="language-selector">
      <select
        id="select-lang"
        value={locale}
        onChange={(e) => setLocale(e.target.value as "es" | "en" | "it" | "pt")}
      >
        <option value="en">🇬🇧 English</option>
        <option value="es">🇪🇸 Español</option>
        <option value="it">🇮🇹 Italiano</option>
        <option value="pt">🇧🇷 Português</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
