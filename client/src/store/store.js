import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import tabsReducer from './slices/tabsSlice';
import explorerReducer from './slices/explorerSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tabs: tabsReducer,
    explorer: explorerReducer,
    portfolio: portfolioReducer,
  },
});
