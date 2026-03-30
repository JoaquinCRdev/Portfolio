import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    openTabs: [
      {
        id: 'account-readme',
        title: 'README.md',
        kind: 'readme',
        section: 'account',
      },
    ],
    activeTabId: 'account-readme',
  },
  reducers: {
    openTab(state, action) {
      const tab = action.payload;
      const existing = state.openTabs.find((item) => item.id === tab.id);

      if (!existing) {
        state.openTabs.push(tab);
      }
      state.activeTabId = tab.id;
    },
    activateTab(state, action) {
      state.activeTabId = action.payload;
    },
    closeTab(state, action) {
      const tabId = action.payload;
      const index = state.openTabs.findIndex((tab) => tab.id === tabId);
      if (index === -1) return;

      const wasActive = state.activeTabId === tabId;
      state.openTabs.splice(index, 1);

      if (!state.openTabs.length) {
        state.activeTabId = null;
        return;
      }

      if (wasActive) {
        const nextTab = state.openTabs[index] || state.openTabs[index - 1] || state.openTabs[0];
        state.activeTabId = nextTab.id;
      }
    },
  },
});

export const { openTab, activateTab, closeTab } = tabsSlice.actions;
export default tabsSlice.reducer;
