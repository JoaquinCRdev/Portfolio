import { useEffect } from "react";
import { Check } from "lucide-react";

const LANGUAGES = [
  { id: "es", label: "Español" },
  { id: "en", label: "English" },
  { id: "pt", label: "Português" },
];

const LANGUAGE_STORAGE_KEY = "app-language";

const LanguageSettings = ({ currentLanguage, onSelectLanguage }) => {
  useEffect(() => {
    if (!currentLanguage) return;
    document.documentElement.lang = currentLanguage;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  }, [currentLanguage]);

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-[var(--titlebar-border)] bg-[rgba(255,255,255,0.02)] p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[var(--editor-fg)]">Language</h2>
        <p className="mt-1 text-sm text-[var(--tab-fg)]">
          This updates <code>document.documentElement.lang</code>.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {LANGUAGES.map((lang) => {
          const active = lang.id === currentLanguage;

          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => onSelectLanguage?.(lang.id)}
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