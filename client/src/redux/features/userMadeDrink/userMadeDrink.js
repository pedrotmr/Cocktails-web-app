import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const userMadeDrink = createSlice({
  name: 'modalSignIn',
  initialState,
  reducers: {
    turnOnUserMadeDrink: state => {
      state.value = true;
    },
    turnOffUserMadeDrink: state => {
      state.value = false
    },
  },
});

export const { turnOnUserMadeDrink, turnOffUserMadeDrink } = userMadeDrink.actions;
export default userMadeDrink.reducer;