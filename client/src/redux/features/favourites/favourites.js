import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourites: (state, drink) => {
      if (state.length > 0) {
        for (let drinks in state) {
          if (drink.payload === drinks.payload) {
            state = state.filter(drink => drink.payload !== drinks.payload);
            return state;
          }
        }
      }
      // return state.value.push(drinkId);
      state.push(drink.payload);
    },
  },
});

export const { toggleFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
