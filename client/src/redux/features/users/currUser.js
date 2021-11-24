import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    savedDrinks: []
  },
};

export const currUserSlice = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: state => {
      state.user = initialState;
      console.log(state.user)
    }
  },
});

export const { setUser, resetUser } = currUserSlice.actions;
export default currUserSlice.reducer;
