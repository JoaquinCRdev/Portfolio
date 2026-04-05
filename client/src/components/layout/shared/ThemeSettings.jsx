import { Check } from "lucide-react";

const THEMES = [
  { id: "vscode-light-2026", label: "VS Code Light 2026" },
  { id: "vscode-dark-2026", label: "VS Code Dark 2026" },
  { id: "dark-plus", label: "Dark+" },
  { id: "dark-modern", label: "Dark Modern" },
  { id: "light-plus", label: "Light+" },
  { id: "light-modern", label: "Light Modern" },
  { id: "visual-studio-dark", label: "Visual Studio Dark" },
  { id: "visual-studio-light", label: "Visual Studio Light" },
  { id: "high-contrast-dark", label: "High Contrast Dark" },
  { id: "high-contrast-light", label: "High Contrast Light" },
];

const THEME_STORAGE_KEY = "app-theme";

const THEME_PREVIEWS = {
  "vscode-light-2026": {
    bg: "#ffffff",
    fg: "#1f1f1f",
    surface: "#f3f3f3",
    sidebar: "#e9e9e9",
    accent: "#0078d4",
    muted: "#8a8a8a",
    selection: "rgba(0, 120, 212, 0.14)",
  },
  "vscode-dark-2026": {
    bg: "#1f1f1f",
    fg: "#cccccc",
    surface: "#252526",
    sidebar: "#181818",
    accent: "#0078d4",
    muted: "#9d9d9d",
    selection: "rgba(0, 120, 212, 0.18)",
  },
  "dark-plus": {
    bg: "#1e1e1e",
    fg: "#d4d4d4",
    surface: "#252526",
    sidebar: "#2a2a2a",
    accent: "#569cd6",
    muted: "#9b9b9b",
    selection: "rgba(86, 156, 214, 0.18)",
  },
  "dark-modern": {
    bg: "#202124",
    fg: "#e8eaed",
    surface: "#2b2c2f",
    sidebar: "#181a1b",
    accent: "#8ab4f8",
    muted: "#a6adb8",
    selection: "rgba(138, 180, 248, 0.18)",
  },
  "light-plus": {
    bg: "#ffffff",
    fg: "#1f1f1f",
    surface: "#f3f3f3",
    sidebar: "#e8e8e8",
    accent: "#0a64ad",
    muted: "#6f6f6f",
    selection: "rgba(10, 100, 173, 0.14)",
  },
  "light-modern": {
    bg: "#fafafa",
    fg: "#202020",
    surface: "#f0f0f0",
    sidebar: "#e6e6e6",
    accent: "#0067b8",
    muted: "#6d6d6d",
    selection: "rgba(0, 103, 184, 0.14)",
  },
  "visual-studio-dark": {
    bg: "#1e1e1e",
    fg: "#cccccc",
    surface: "#252526",
    sidebar: "#1b1b1d",
    accent: "#c586c0",
    muted: "#9d9d9d",
    selection: "rgba(197, 134, 192, 0.18)",
  },
  "visual-studio-light": {
    bg: "#ffffff",
    fg: "#1f1f1f",
    surface: "#f5f5f5",
    sidebar: "#ededed",
    accent: "#007acc",
    muted: "#6c6c6c",
    selection: "rgba(0, 122, 204, 0.14)",
  },
  "high-contrast-dark": {
    bg: "#000000",
    fg: "#ffffff",
    surface: "#111111",
    sidebar: "#080808",
    accent: "#ffff00",
    muted: "#cccccc",
    selection: "rgba(255, 255, 0, 0.18)",
  },
  "high-contrast-light": {
    bg: "#ffffff",
    fg: "#000000",
    surface: "#f4f4f4",
    sidebar: "#ececec",
    accent: "#0000ff",
    muted: "#4a4a4a",
    selection: "rgba(0, 0, 255, 0.14)",
  },
};

const ThemeSettings = ({ currentTheme, onSelectTheme }) => {
  const handleSelect = (themeId) => {
    onSelectTheme?.(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  };

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-[var(--titlebar-border)] bg-[rgba(255,255,255,0.02)] p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[var(--editor-fg)]">
            <span className="font-medium text-[var(--tab-fg)]">Workbench: </span>
            Color Theme
        </h2>
        <p className="mt-1 text-sm text-[var(--tab-fg)]">
          Select the color theme of your preference.
        </p>
      </div>

      <div className="theme-settings-scroll h-[calc(85vh-14rem)] overflow-y-auto pr-2">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {THEMES.map((theme) => {
            const active = theme.id === currentTheme;
            const preview = THEME_PREVIEWS[theme.id] ?? THEME_PREVIEWS["vscode-dark-2026"];

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(theme.id)}
                className={[
                  "group flex min-h-36 flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-150",
                  active
                    ? "bg-[var(--list-active-bg)]"
                    : "bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)]",
                ].join(" ")}
                style={{
                  borderColor: active ? "var(--focus-border)" : "var(--titlebar-border)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold text-[var(--editor-fg)]">
                      {theme.label}
                    </div>
                    <div className="mt-1 truncate text-xs text-[var(--tab-fg)]">
                      {theme.id}
                    </div>
                  </div>

                  <div className="mt-0.5 flex shrink-0 items-center">
                    {active ? (
                      <Check size={18} className="text-[var(--button-bg)]" />
                    ) : (
                      <span className="h-3 w-3 rounded-full border border-[var(--tab-fg)]/50" />
                    )}
                  </div>
                </div>

                <div
                  className="mt-4 overflow-hidden rounded-xl border p-3 shadow-inner"
                  style={{
                    background: preview.bg,
                    color: preview.fg,
                    borderColor: "rgba(127,127,127,0.35)",
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xs font-medium" style={{ color: preview.fg }}>
                      Preview
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: preview.muted }}
                    >
                      VS Code
                    </div>
                  </div>

                  <div
                    className="rounded-lg border p-2"
                    style={{
                      background: preview.surface,
                      borderColor: "rgba(127,127,127,0.22)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: preview.accent }}
                      />
                      <span
                        className="h-2.5 w-24 rounded-full"
                        style={{ background: preview.muted, opacity: 0.55 }}
                      />
                    </div>

                    <div className="mt-3 space-y-2">
                      <div
                        className="h-2.5 w-5/6 rounded-full"
                        style={{ background: preview.fg, opacity: 0.12 }}
                      />
                      <div
                        className="h-2.5 w-2/3 rounded-full"
                        style={{ background: preview.selection }}
                      />
                      <div
                        className="h-2.5 w-3/4 rounded-full"
                        style={{ background: preview.fg, opacity: 0.09 }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <span className="h-3 rounded-full" style={{ background: preview.sidebar }} />
                    <span className="h-3 rounded-full" style={{ background: preview.surface }} />
                    <span className="h-3 rounded-full" style={{ background: preview.accent }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .theme-settings-scroll {
          scrollbar-width: thin;
          scrollbar-color: var(--scrollbar-slider-bg) var(--scrollbar-track-bg);
        }

        .theme-settings-scroll::-webkit-scrollbar {
          width: 12px;
        }

        .theme-settings-scroll::-webkit-scrollbar-track {
          background: var(--scrollbar-track-bg);
        }

        .theme-settings-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            var(--scrollbar-slider-hover-bg),
            var(--scrollbar-slider-bg)
          );
          border-radius: 9999px;
          border: 3px solid transparent;
          background-clip: content-box;
        }

        .theme-settings-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            var(--scrollbar-slider-hover-bg),
            var(--scrollbar-slider-active-bg)
          );
          border: 3px solid transparent;
          background-clip: content-box;
        }

        .theme-settings-scroll::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default ThemeSettings;