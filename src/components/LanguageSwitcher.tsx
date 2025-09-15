import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="mb-6 flex gap-2 items-center">
      <span className="font-semibold">{t("language")}:</span>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-2 py-1 rounded bg-gray-200"
      >
        <option value="en">{t("english")}</option>
        <option value="de">{t("german")}</option>
        <option value="es">{t("spanish")}</option>
        <option value="fr">{t("french")}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
