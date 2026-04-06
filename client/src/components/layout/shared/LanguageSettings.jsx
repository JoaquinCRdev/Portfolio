import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

const LANGUAGE_IDS = ["es", "en", "de"];

const LanguageSettings = ({ currentLanguage, onSelectLanguage }) => {
  const { t } = useTranslation("ui");

  const activeLanguage = currentLanguage || i18n.resolvedLanguage || i18n.language;

  const LANGUAGES = LANGUAGE_IDS.map((id) => ({
    id,
    label: t(`config.language.languages.${id}`),
  }));

  const handleChangeLanguage = (langId) => {
    onSelectLanguage?.(langId);
    i18n.changeLanguage(langId);
    document.documentElement.lang = langId;
    window.localStorage.setItem("app-language", langId);
  };

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-[var(--titlebar-border)] bg-[rgba(255,255,255,0.02)] p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[var(--editor-fg)]">
          {t("config.language.languageTitle")}
        </h2>
        <p className="mt-1 text-sm text-[var(--tab-fg)]">
          {t("config.language.languageDescription")}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {LANGUAGES.map((lang) => {
          const active = lang.id === activeLanguage;

          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => handleChangeLanguage(lang.id)}
              className={[
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all",
                active
                  ? "bg-[var(--list-active-bg)]"
                  : "bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)]",
              ].join(" ")}
              style={{
                borderColor: active ? "var(--focus-border)" : "var(--titlebar-border)",
              }}
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-[var(--editor-fg)]">
                  {lang.label}
                </div>
                <div className="truncate text-xs text-[var(--tab-fg)]">{lang.id}</div>
              </div>

              <div className="ml-3 flex shrink-0 items-center">
                {active ? (
                  <Check size={16} className="text-[var(--button-bg)]" />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--tab-fg)]/60" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSettings;