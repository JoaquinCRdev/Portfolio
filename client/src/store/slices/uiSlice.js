import { createSlice } from '@reduxjs/toolkit';

const MIN_EXPLORER_WIDTH = 220;
const MAX_EXPLORER_WIDTH = 360;
const DEFAULT_EXPLORER_WIDTH = 248;
const STORAGE_KEY = 'explorerWidth';

const clampExplorerWidth = (width) => {
  return Math.max(MIN_EXPLORER_WIDTH, Math.min(MAX_EXPLORER_WIDTH, width));
};

const getInitialExplorerWidth = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_EXPLORER_WIDTH;
  }

  const storedWidth = window.localStorage.getItem(STORAGE_KEY);
  if (storedWidth) {
    const width = parseInt(storedWidth, 10);
    if (!Number.isNaN(width)) {
      return clampExplorerWidth(width);
    }
  }

  return DEFAULT_EXPLORER_WIDTH;
};

const layoutForSection = (section) => {
  const showExplorer = section === 'account' || section === 'explorer';

  return {
    panelMode: showExplorer ? 'normal' : 'expanded',
    explorerVisible: showExplorer,
    transitionState: showExplorer ? 'expanding' : 'collapsing',
  };
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeSection: 'account',
    panelMode: 'normal',
    explorerVisible: true,
    sidebarCollapsed: false,
    transitionState: 'idle',
    explorerWidth: getInitialExplorerWidth(),
  },
  reducers: {
    activateSection(state, action) {
      const section = action.payload;
      state.activeSection = section;

      const layout = layoutForSection(section);
      state.panelMode = layout.panelMode;
      state.explorerVisible = layout.explorerVisible;
      state.transitionState = layout.transitionState;
    },

    setSidebarCollapsed(state, action) {
      state.sidebarCollapsed = Boolean(action.payload);
    },

    setTransitionState(state, action) {
      state.transitionState = action.payload;
    },

    setExplorerWidth(state, action) {
      const width = clampExplorerWidth(action.payload);
      state.explorerWidth = width;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, width.toString());
      }
    },
  },
});

export const {
  activateSection,
  setSidebarCollapsed,
  setTransitionState,
  setExplorerWidth,
} = uiSlice.actions;

export {
  clampExplorerWidth,
  MIN_EXPLORER_WIDTH,
  MAX_EXPLORER_WIDTH,
  DEFAULT_EXPLORER_WIDTH,
  STORAGE_KEY,
};

export default uiSlice.reducer;