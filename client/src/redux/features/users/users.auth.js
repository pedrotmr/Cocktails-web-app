import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: state => {
      state.value = true;
    },
    logout: state => {
      state.value = false;
    },
    isAuthenticated: state => {
      return state.value;
    },
  },
});

export const { login, logout, isAuthenticated } = userAuthSlice.actions;
export default userAuthSlice.reducer;
