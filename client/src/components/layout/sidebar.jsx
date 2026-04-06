import {
  Files,
  Search,
  GitBranch,
  Blocks,
  CircleUser,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { activateSection } from "../../store/slices/uiSlice";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const dispatch = useDispatch();
  const activeSection = useSelector((state) => state.ui.activeSection);
  const { t } = useTranslation("ui");

  const itemsTop = [
    { id: "explorer", label: t("sidebar.label.explorer"), icon: Files, badge: null },
    { id: "experience", label: t("sidebar.label.search"), icon: Search, badge: null },
    { id: "github", label: t("sidebar.label.sourceControl"), icon: GitBranch, badge: 9 },
    { id: "skills", label: t("sidebar.label.extensions"), icon: Blocks, badge: null },
  ];

  const itemsBottom = [
    { id: "account", label: t("sidebar.label.account"), icon: CircleUser, badge: null },
    { id: "settings", label: t("sidebar.label.settings"), icon: Settings, badge: null },
  ];

  const renderItem = (item) => {
    const Icon = item.icon;
    const active = activeSection === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => dispatch(activateSection(item.id))}
        aria-label={item.label}
        className={[
          "group relative flex h-12 w-full items-center justify-center",
          "transition-colors duration-150 ease-out outline-none",
          active
            ? "bg-[var(--activitybar-active-bg)] text-[var(--activitybar-fg)]"
            : "text-[var(--activitybar-inactive-fg)] hover:bg-[var(--list-hover-bg)] hover:text-[var(--activitybar-fg)]",
          "focus-visible:bg-[var(--list-hover-bg)] focus-visible:text-[var(--activitybar-fg)]",
          "before:absolute before:left-0 before:top-1/2 before:h-9 before:w-[3px] before:-translate-y-1/2 before:rounded-r-full before:content-['']",
          active
            ? "before:bg-[var(--activitybar-active-border)]"
            : "before:bg-transparent group-hover:before:bg-[var(--activitybar-active-border)]",
        ].join(" ")}
      >
        <Icon
          className={[
            "h-5 w-5 transition-colors duration-150",
            active
              ? "text-[var(--activitybar-fg)]"
              : "text-[var(--activitybar-inactive-fg)] group-hover:text-[var(--activitybar-fg)]",
          ].join(" ")}
        />

        {item.badge ? (
          <span className="absolute right-1 top-1 min-w-4 rounded-full bg-[var(--activitybar-badge-bg)] px-1 text-[10px] font-semibold leading-4 text-[var(--activitybar-badge-fg)]">
            {item.badge}
          </span>
        ) : null}

        <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--menu-border)] bg-[var(--menu-bg)] px-2 py-1 text-xs font-medium text-[var(--menu-fg)] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <aside className="flex h-full w-12 flex-col items-center border-r border-[var(--activitybar-border)] bg-[var(--activitybar-bg)] py-2">
      <div className="flex w-full flex-1 flex-col items-center gap-1.5">
        {itemsTop.map(renderItem)}
      </div>

      <div className="flex w-full flex-col items-center gap-1.5 pb-2">
        {itemsBottom.map(renderItem)}
      </div>
    </aside>
  );
}