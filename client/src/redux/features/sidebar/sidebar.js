import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSideBar: state => {
      state.value = !state.value;
    },
  },
});

export const { toggleSideBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
