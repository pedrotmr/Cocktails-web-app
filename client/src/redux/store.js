import { configureStore } from '@reduxjs/toolkit';
import sideBarReducer from './features/sidebar/sidebar';

export const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
  },
});
