import { useEffect, useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import VisualSettingsModal from "./shared/VisualSettingsModal";
import ThemeSettings from "./shared/ThemeSettings";
import LanguageSettings from "./shared/LanguageSettings";

const THEME_STORAGE_KEY = "app-theme";
const DEFAULT_THEME = "vscode-dark-2026";

const getInitialTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;

  return (
    window.localStorage.getItem(THEME_STORAGE_KEY) ||
    document.documentElement.getAttribute("data-theme") ||
    DEFAULT_THEME
  );
};

const MENU_ITEMS = [
  "file",
  "edit",
  "selection",
  "view",
  "go",
  "run",
  "terminal",
  "help",
];

const Header = () => {
  const { t } = useTranslation("ui");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsType, setSettingsType] = useState("theme");
  const [theme, setTheme] = useState(getInitialTheme);

  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const openSettings = (type) => {
    setSettingsType(type);
    setSettingsOpen(true);
  };

  return (
    <>
      <header className="flex h-10 w-full select-none items-center justify-between border-b border-[var(--titlebar-border)] bg-[var(--titlebar-bg)] px-3 text-sm font-medium text-[var(--titlebar-fg)]">
        <div className="flex items-center gap-4">
          <img src="/vscode-icon.svg.png" alt="VSCode Icon" className="h-4 w-4" />

          <nav className="flex items-center gap-1">
            {MENU_ITEMS.map((item) => (
              <span
                key={item}
                className="cursor-default rounded-md px-2 py-[2px] transition-colors hover:bg-[var(--titlebar-hover-bg)]"
              >
                {t(`header.${item}`)}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 text-[var(--titlebar-fg)]/80">
          <button
            type="button"
            onClick={() => openSettings("theme")}
            className="rounded-md px-3 py-1 text-xs transition-colors hover:bg-white/10 hover:text-[var(--titlebar-fg)]"
          >
            {t("settings.theme")}
          </button>

          <button
            type="button"
            onClick={() => openSettings("language")}
            className="rounded-md px-3 py-1 text-xs transition-colors hover:bg-white/10 hover:text-[var(--titlebar-fg)]"
          >
            {t("settings.language")}
          </button>

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md transition-colors hover:bg-white/10"
            aria-label="Minimize"
          >
            <Minus size={16} />
          </button>

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md transition-colors hover:bg-white/10"
            aria-label="Maximize"
          >
            <Square size={14} />
          </button>

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md transition-colors hover:bg-red-500/80 hover:text-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <VisualSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        {settingsType === "theme" ? (
          <ThemeSettings currentTheme={theme} onSelectTheme={setTheme} />
        ) : (
          <LanguageSettings currentLanguage={currentLanguage} />
        )}
      </VisualSettingsModal>
    </>
  );
};

export default Header;