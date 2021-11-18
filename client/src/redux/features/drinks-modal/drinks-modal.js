import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const drinksModalSlice = createSlice({
  name: 'drinksModal',
  initialState,
  reducers: {
    toggleDrinksModal: state => {
      state.value = !state.value;
    },
  },
});

export const { toggleDrinksModal } = drinksModalSlice.actions;
export default drinksModalSlice.reducer;
