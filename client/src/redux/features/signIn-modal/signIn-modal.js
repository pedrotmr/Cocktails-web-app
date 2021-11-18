import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const modalSignInSlice = createSlice({
  name: 'modalSignIn',
  initialState,
  reducers: {
    toggleModalSignIn: state => {
      state.value = !state.value;
    },
  },
});

export const { toggleModalSignIn } = modalSignInSlice.actions;
export default modalSignInSlice.reducer;
