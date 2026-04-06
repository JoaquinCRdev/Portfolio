import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const VisualSettingsModal = ({ open, onClose, children }) => {
  const { t } = useTranslation("ui");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const settingsSections = [
    {
      key: "cu",
      label: t("config.settingsSections.cu"),
      selected: true,
    },
    {
      key: "te",
      label: t("config.settingsSections.te"),
    },
    {
      key: "wb",
      label: t("config.settingsSections.wb"),
    },
    {
      key: "window",
      label: t("config.settingsSections.window"),
    },
    {
      key: "chat",
      label: t("config.settingsSections.chat"),
    },
    {
      key: "features",
      label: t("config.settingsSections.features"),
    },
    {
      key: "application",
      label: t("config.settingsSections.application"),
    },
    {
      key: "security",
      label: t("config.settingsSections.security"),
    },
    {
      key: "extensions",
      label: t("config.settingsSections.extensions"),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label={t("config.closeOverlay")}
        className="absolute inset-0 bg-[var(--overlay-bg)]"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 h-[85vh] w-full max-w-6xl overflow-hidden rounded-xl border border-[var(--titlebar-border)] bg-[var(--app-bg)] text-[var(--app-fg)] shadow-[0_14px_42px_rgba(0,0,0,0.28)]"
      >
        <div
          className="flex h-12 items-center justify-between border-b px-4"
          style={{
            background: "var(--titlebar-bg)",
            borderColor: "var(--titlebar-border)",
            color: "var(--titlebar-fg)",
          }}
        >
          <div className="text-sm font-medium">{t("config.title")}</div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md transition-colors hover:bg-white/10"
            aria-label={t("config.closeSettings")}
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4 pt-4">
          <div
            className="flex h-10 items-center rounded-md border px-3 text-sm outline-none"
            style={{
              background: "var(--input-bg)",
              color: "var(--input-placeholder)",
              borderColor: "var(--input-border)",
            }}
          >
            {t("config.search")}
          </div>
        </div>

        <div className="grid h-[calc(85vh-5rem)] grid-cols-[260px_1fr]">
          <aside
            className="border-r px-4 py-5"
            style={{
              background: "var(--sidebar-bg)",
              borderColor: "var(--sidebar-border)",
              color: "var(--sidebar-fg)",
            }}
          >
            <div className="space-y-1 text-sm">
              {settingsSections.map((item) => {
                const selected = item.selected;

                return (
                  <button
                    key={item.key}
                    type="button"
                    className={[
                      "w-full border-l-2 px-3 py-2 text-left transition-colors",
                      selected
                        ? "border-l-[var(--focus-border)] bg-[var(--list-hover-bg)] text-[var(--list-hover-fg)]"
                        : "border-l-transparent text-[var(--sidebar-fg)] hover:bg-[var(--list-hover-bg)] hover:text-[var(--list-hover-fg)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="overflow-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default VisualSettingsModal;