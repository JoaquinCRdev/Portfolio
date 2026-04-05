import { useEffect, useState } from "react";
import { Minus, Square, X } from "lucide-react";
import VisualSettingsModal from "./shared/VisualSettingsModal";
import ThemeSettings from "./shared/ThemeSettings";
import LanguageSettings from "./shared/LanguageSettings";

const THEME_STORAGE_KEY = "app-theme";
const LANGUAGE_STORAGE_KEY = "app-language";

const DEFAULT_THEME = "vscode-dark-2026";
const DEFAULT_LANGUAGE = "es";

const getInitialTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return (
    window.localStorage.getItem(THEME_STORAGE_KEY) ||
    document.documentElement.getAttribute("data-theme") ||
    DEFAULT_THEME
  );
};

const getInitialLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  return (
    window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
    document.documentElement.lang ||
    DEFAULT_LANGUAGE
  );
};

const Header = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsType, setSettingsType] = useState("theme"); // "theme" | "language"

  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const openThemeSettings = () => {
    setSettingsType("theme");
    setSettingsOpen(true);
  };

  const openLanguageSettings = () => {
    setSettingsType("language");
    setSettingsOpen(true);
  };

  const closeSettings = () => setSettingsOpen(false);

  return (
    <>
      <header className="flex h-10 w-full select-none items-center justify-between bg-[var(--titlebar-bg)] px-3 text-sm font-medium text-[var(--titlebar-fg)] border-b border-[var(--titlebar-border)]">
        {/* Left */}
        <div className="flex items-center gap-4">
          <img src="/vscode-icon.svg.png" alt="VSCode Icon" className="h-4 w-4" />

          <nav className="flex items-center gap-1">
            {["File", "Edit", "Selection", "View", "Go", "Run", "..."].map((item) => (
              <span
                key={item}
                className="cursor-default rounded-md px-2 py-[2px] transition-colors hover:bg-[var(--titlebar-hover-bg)]"
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 text-[var(--titlebar-fg)]/80">
          <button
            type="button"
            onClick={openThemeSettings}
            className="rounded-md px-3 py-1 text-xs transition-colors hover:bg-white/10 hover:text-[var(--titlebar-fg)]"
          >
            Theme
          </button>

          <button
            type="button"
            onClick={openLanguageSettings}
            className="rounded-md px-3 py-1 text-xs transition-colors hover:bg-white/10 hover:text-[var(--titlebar-fg)]"
          >
            Language
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

      <VisualSettingsModal open={settingsOpen} onClose={closeSettings}>
        {settingsType === "theme" ? (
          <ThemeSettings currentTheme={theme} onSelectTheme={setTheme} />
        ) : (
          <LanguageSettings currentLanguage={language} onSelectLanguage={setLanguage} />
        )}
      </VisualSettingsModal>
    </>
  );
};

export default Header;