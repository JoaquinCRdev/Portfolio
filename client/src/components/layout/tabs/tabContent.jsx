import { useMemo } from "react";
import {
  ChevronRight,
  FileText,
  Folder,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { findProjectById } from "../../../utils/explorerHelpers";
import ReadmePage from "../../../pages/readme/index.jsx";
import AboutPage from "../../../pages/about/index.jsx";
import ExperiencePage from "../../../pages/experience/index.jsx";
import GithubPage from "../../../pages/github/index.jsx";
import SkillsPage from "../../../pages/skills/index.jsx";
import SettingsPage from "../../../pages/settings/index.jsx";
import ProjectsPage from "../../../pages/projects/index.jsx";
import ProjectDetailPage from "../../../pages/projects/projectDetail.jsx";
import ProjectReadmePage from "../../../pages/projects/projectReadme.jsx";
import ProjectImagePage from "../../../pages/projects/projectImage.jsx";
import NotFoundPage from "../../../pages/notFound/index.jsx";
import { openTab, closeTab } from "../../../store/slices/tabsSlice";
import { createProjectTab } from "../../../utils/tabFactory";
import { setActiveProject } from "../../../store/slices/explorerSlice";

function getTabLabel(tab) {
  return tab?.label || tab?.title || "Untitled";
}

function getBreadcrumbs(tab, project) {
  if (!tab) return [];

  switch (tab.kind) {
    case "readme":
    case "account":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "account", icon: Folder },
        { label: "README.md", icon: FileText },
      ];

    case "about":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "account", icon: Folder },
        { label: "about.md", icon: FileText },
      ];

    case "projectsOverview":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "projects", icon: Folder },
        { label: "projects.md", icon: FileText },
      ];

    case "experience":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "experience", icon: Folder },
        { label: "experience.md", icon: FileText },
      ];

    case "github":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "github", icon: Folder },
        { label: "github.md", icon: FileText },
      ];

    case "skills":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "skills", icon: Folder },
        { label: "skills.md", icon: FileText },
      ];

    case "settings":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "settings", icon: Folder },
        { label: "settings.json", icon: FileText },
      ];

    case "projectDetail":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "projects", icon: Folder },
        { label: project?.slug || "project", icon: Folder },
        { label: "detail", icon: FileText },
      ];

    case "projectReadme":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "projects", icon: Folder },
        { label: project?.slug || "project", icon: Folder },
        { label: "README.md", icon: FileText },
      ];

    case "projectImage":
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "projects", icon: Folder },
        { label: project?.slug || "project", icon: Folder },
        { label: "images", icon: Folder },
        { label: tab.fileName || "image.png", icon: ImageIcon },
      ];

    default:
      return [
        { label: "PORTFOLIO", icon: Folder },
        { label: "unknown", icon: FileText },
      ];
  }
}

export default function TabContent() {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.data);
  const { openTabs, activeTabId } = useSelector((state) => state.tabs);

  const activeTab = useMemo(
    () => openTabs.find((tab) => tab.id === activeTabId) || null,
    [openTabs, activeTabId],
  );

  const project = activeTab?.projectId
    ? findProjectById(portfolio.projects, activeTab.projectId)
    : null;

  const openProjectDetail = (projectId) => {
    const target = findProjectById(portfolio.projects, projectId);
    if (!target) return;
    dispatch(setActiveProject(target.id));
    dispatch(openTab(createProjectTab(target, "projectDetail")));
  };

  const openProjectReadme = (projectId) => {
    const target = findProjectById(portfolio.projects, projectId);
    if (!target) return;
    dispatch(setActiveProject(target.id));
    dispatch(openTab(createProjectTab(target, "projectReadme")));
  };

  const commonProps = {
    portfolio,
    project,
    openTab: (tab) => dispatch(openTab(tab)),
    setActiveProject: (projectId) => dispatch(setActiveProject(projectId)),
    openProjectDetail,
    openProjectReadme,
  };

  if (!openTabs.length) {
    return (
      <div className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-[var(--editor-bg)] text-[var(--editor-fg)]">
        <div className="rounded-xl border border-[var(--editor-group-header-border)] bg-[var(--editor-group-empty-bg)] px-5 py-4 text-sm text-[var(--editor-fg)]/70">
          Nothing to see here.
        </div>
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbs(activeTab, project);

  const renderActivePage = () => {
    switch (activeTab?.kind) {
      case "readme":
      case "account":
        return <ReadmePage portfolio={portfolio} />;

      case "about":
        return <AboutPage portfolio={portfolio} />;

      case "projectsOverview":
        return <ProjectsPage portfolio={portfolio} {...commonProps} />;

      case "experience":
        return <ExperiencePage portfolio={portfolio} />;

      case "github":
        return <GithubPage portfolio={portfolio} />;

      case "skills":
        return <SkillsPage portfolio={portfolio} />;

      case "settings":
        return <SettingsPage portfolio={portfolio} />;

      case "projectDetail":
        return <ProjectDetailPage project={project} {...commonProps} />;

      case "projectReadme":
        return <ProjectReadmePage project={project} {...commonProps} />;

      case "projectImage":
        return (
          <ProjectImagePage
            project={project}
            fileName={activeTab.fileName}
            {...commonProps}
          />
        );

      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[var(--editor-bg)] text-[var(--editor-fg)]">
      <div className="flex h-10 min-h-10 items-center overflow-x-auto border-b border-[var(--tab-border)] bg-[var(--tab-bg)]">
        <div className="flex min-w-0 flex-1">
          {openTabs.map((tab) => {
            const active = tab.id === activeTabId;
            const dirty = Boolean(tab.isDirty);

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => dispatch(openTab(tab))}
                className={[
                  "group relative flex h-10 min-w-[140px] max-w-[260px] items-center gap-2 px-3 text-left text-[13px] transition-colors",
                  "border-r border-r-[var(--tab-border)]",
                  active
                    ? [
                        "bg-[var(--tab-active-bg)] text-[var(--tab-active-fg)]",
                        "border-t-2 border-t-[var(--tab-active-border-top)]",
                        "border-b border-b-[var(--tab-active-bg)]",
                      ].join(" ")
                    : [
                        "bg-[var(--tab-bg)] text-[var(--tab-fg)]",
                        "border-t-2 border-t-transparent",
                        "border-b border-b-[var(--tab-border)]",
                        "hover:bg-[var(--list-hover-bg)] hover:text-[var(--tab-active-fg)]",
                      ].join(" "),
                ].join(" ")}
              >
                <span className="h-3 w-3 shrink-0 rounded-full bg-[var(--badge-bg)]/0">
                  {dirty ? (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--badge-bg)] align-middle" />
                  ) : null}
                </span>

                <span className="min-w-0 flex-1 truncate">{getTabLabel(tab)}</span>

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(closeTab(tab.id));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      dispatch(closeTab(tab.id));
                    }
                  }}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[var(--tab-fg)] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--titlebar-hover-bg)] hover:text-[var(--tab-active-fg)]"
                  aria-label={`Close ${getTabLabel(tab)}`}
                >
                  <X className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex h-8 min-h-8 items-center overflow-x-auto border-b border-[var(--editor-group-header-border)] bg-[var(--breadcrumb-bg)] px-4 text-[12px]">
        <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[var(--breadcrumb-fg)]">
          {breadcrumbs.map((crumb, index) => {
            const Icon = crumb.icon;
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div
                key={`${crumb.label}-${index}`}
                className="flex min-w-0 items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRight className="h-3.5 w-3.5 text-[var(--breadcrumb-fg)]/80" />
                ) : null}
                <span
                  className={[
                    "flex items-center gap-1.5 truncate",
                    isLast
                      ? "text-[var(--breadcrumb-active-fg)]"
                      : "text-[var(--breadcrumb-fg)]",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{crumb.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-[var(--editor-bg)]">
        {renderActivePage()}
      </div>
    </div>
  );
}