import { createSlice } from '@reduxjs/toolkit';

const layoutForSection = (section) => {
  if (section === 'account' || section === 'explorer') {
    return {
      panelMode: 'normal',
      explorerVisible: true,
      transitionState: 'collapsing',
    };
  }

  return {
    panelMode: 'expanded',
    explorerVisible: false,
    transitionState: 'expanding',
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
  },
});

export const { activateSection, setSidebarCollapsed, setTransitionState } = uiSlice.actions;
export default uiSlice.reducer;
