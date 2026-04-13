import { createSlice } from '@reduxjs/toolkit';
import { explorerTree } from '../../data/explorerTree';

const STORAGE_KEY = 'portfolio-explorer-state';

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      tree: explorerTree,
      expandedFolders: ['portfolio'],
      selectedItemId: 'root-readme',
      activeProjectId: null,
    };
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        tree: explorerTree,
        expandedFolders: ['portfolio'],
        selectedItemId: 'root-readme',
        activeProjectId: null,
      };
    }

    const parsed = JSON.parse(saved);

    return {
      tree: explorerTree,
      expandedFolders: Array.isArray(parsed.expandedFolders) ? parsed.expandedFolders : ['portfolio'],
      selectedItemId: parsed.selectedItemId || 'root-readme',
      activeProjectId: parsed.activeProjectId || null,
    };
  } catch {
    return {
      tree: explorerTree,
      expandedFolders: ['portfolio'],
      selectedItemId: 'root-readme',
      activeProjectId: null,
    };
  }
};

const saveState = (state) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      expandedFolders: state.expandedFolders,
      selectedItemId: state.selectedItemId,
      activeProjectId: state.activeProjectId,
    })
  );
};

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: getInitialState(),
  reducers: {
    toggleFolder(state, action) {
      const folderId = action.payload;
      const index = state.expandedFolders.indexOf(folderId);

      if (index >= 0) {
        state.expandedFolders.splice(index, 1);
      } else {
        state.expandedFolders.push(folderId);
      }

      saveState(state);
    },
    selectItem(state, action) {
      state.selectedItemId = action.payload;
      saveState(state);
    },
    setActiveProject(state, action) {
      state.activeProjectId = action.payload;
      saveState(state);
    },
  },
});

export const { toggleFolder, selectItem, setActiveProject } = explorerSlice.actions;
export default explorerSlice.reducer;