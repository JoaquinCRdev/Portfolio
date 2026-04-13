import {
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Image,
  MoreHorizontal,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openTab } from '../../../store/slices/tabsSlice';
import { selectItem, setActiveProject, toggleFolder } from '../../../store/slices/explorerSlice';
import { createSectionTab, createTabById, createProjectTab } from '../../../utils/tabFactory';
import { findProjectById } from '../../../utils/explorerHelpers';

function iconForNode(node, open) {
  if (node.type === 'folder') return open ? FolderOpen : Folder;
  if (node.action?.kind === 'projectImage') return Image;
  return FileText;
}

function statusClass(status) {
  if (status === 'U') return 'text-emerald-400';
  if (status === 'M') return 'text-amber-300';
  return 'text-[var(--sidebar-fg)]/40';
}

function ExplorerRow({ node, depth, open, active, onClick, children, status }) {
  const Icon = iconForNode(node, open);

  return (
    <div className="select-none">
      <button
        type="button"
        onClick={onClick}
        className={[
          'group flex w-full items-center gap-1.5 rounded-[4px] px-2 py-[3px] text-left text-[13px] leading-5',
          'transition-colors duration-150',
          active
            ? 'bg-[var(--list-active-bg)] text-[var(--list-active-fg)]'
            : 'text-[var(--sidebar-fg)] hover:bg-[var(--list-hover-bg)] hover:text-[var(--list-hover-fg)]',
        ].join(' ')}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        <span className="flex w-4 shrink-0 items-center justify-center">
          {node.type === 'folder' ? (
            open ? (
              <ChevronDown className="h-4 w-4 text-[var(--sidebar-fg)]/80" />
            ) : (
              <ChevronRight className="h-4 w-4 text-[var(--sidebar-fg)]/80" />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
        </span>

        <Icon
          className={[
            'h-4 w-4 shrink-0',
            node.type === 'folder'
              ? 'text-[#d7ba7d]'
              : node.action?.kind === 'section'
                ? 'text-[#4ec9b0]'
                : 'text-[#9cdcfe]',
          ].join(' ')}
        />

        <span className="min-w-0 flex-1 truncate">{node.label}</span>

        {status ? (
          <span className={['ml-2 text-[11px] font-medium tabular-nums', statusClass(status)].join(' ')}>
            {status}
          </span>
        ) : null}
      </button>

      {children}
    </div>
  );
}

export default function Explorer() {
  const dispatch = useDispatch();
  const tree = useSelector((state) => state.explorer.tree);
  const expandedFolders = useSelector((state) => state.explorer.expandedFolders);
  const selectedItemId = useSelector((state) => state.explorer.selectedItemId);
  const portfolio = useSelector((state) => state.portfolio.data);
  const activeProjectId = useSelector((state) => state.explorer.activeProjectId);

  const handleNodeClick = (node) => {
    dispatch(selectItem(node.id));

    if (node.type === 'folder') {
      dispatch(toggleFolder(node.id));

      if (node.id.startsWith('folder-')) {
        const projectId = node.id.replace('folder-', '');
        dispatch(setActiveProject(projectId));
      }
      return;
    }

    const projectId = node.action?.projectId || activeProjectId;
    const project = projectId ? findProjectById(portfolio.projects, projectId) : null;

    if (node.action?.kind === 'section') {
      dispatch(openTab(createTabById(node.action.tabId) || createSectionTab(node.action.section)));
      return;
    }

    if (node.action?.kind === 'projectReadme' && project) {
      dispatch(setActiveProject(project.id));
      dispatch(openTab(createProjectTab(project, 'projectReadme')));
      return;
    }

    if (node.action?.kind === 'projectImage' && project) {
      dispatch(setActiveProject(project.id));
      dispatch(openTab(createProjectTab(project, 'projectImage', node.action.fileName)));
      return;
    }
  };

  const renderNode = (node, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isOpen = expandedFolders.includes(node.id);
    const active = selectedItemId === node.id;
    const hasChildren = isFolder && node.children?.length > 0;

    return (
      <div key={node.id} className="select-none">
        <ExplorerRow
          node={node}
          depth={depth}
          open={isOpen}
          active={active}
          status={node.status}
          onClick={() => handleNodeClick(node)}
        >
          {isFolder && isOpen && hasChildren ? (
            <div className="mt-0.5">
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          ) : null}
        </ExplorerRow>
      </div>
    );
  };

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)]">
      <div className="flex items-center justify-between border-b border-[var(--sidebar-border)] px-4 py-2.5">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--sidebar-title-fg)]">
          Explorer
        </p>

        <button
          type="button"
          className="rounded-[4px] p-1 text-[var(--sidebar-title-fg)]/80 hover:bg-[var(--list-hover-bg)] hover:text-[var(--sidebar-title-fg)]"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-0.5">
          {tree.map((node) => renderNode(node))}
        </div>
      </div>
    </aside>
  );
}