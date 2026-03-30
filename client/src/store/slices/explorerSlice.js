import { createSlice } from '@reduxjs/toolkit';
import { explorerTree } from '../../data/explorerTree';

const explorerSlice = createSlice({
  name: 'explorer',
  initialState: {
    tree: explorerTree,
    expandedFolders: [],
    selectedItemId: 'root-readme',
    activeProjectId: null,
  },
  reducers: {
    toggleFolder(state, action) {
      const folderId = action.payload;
      const index = state.expandedFolders.indexOf(folderId);

      if (index >= 0) {
        state.expandedFolders.splice(index, 1);
      } else {
        state.expandedFolders.push(folderId);
      }
    },
    selectItem(state, action) {
      state.selectedItemId = action.payload;
    },
    setActiveProject(state, action) {
      state.activeProjectId = action.payload;
    },
  },
});

export const { toggleFolder, selectItem, setActiveProject } = explorerSlice.actions;
export default explorerSlice.reducer;
