import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trigger: false,
};

export const userDrinksSlice = createSlice({
  name: 'userDrinks',
  initialState,
  reducers: {
    refreshUserDrinks: (state) => {
      state.trigger = !state.trigger;
    }
  },
});

export const { refreshUserDrinks } = userDrinksSlice.actions;
export default userDrinksSlice.reducer;