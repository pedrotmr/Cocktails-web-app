import { createSlice } from '@reduxjs/toolkit';

const initialState = {
drinks : {
  dateModified: "",
  idDrink: "",
  strAlcoholic: "",
  strCategory: "",
  strCreativeCommonsConfirmed: "",
  strDrink: "",
  strDrinkAlternate: null,
  strDrinkThumb: "",
  strGlass: "",
  strIBA: "",
  strImageAttribution: "",
  strImageSource: "",
  strIngredient1: "",
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strIngredient2: "",
  strIngredient3: "",
  strIngredient4: "",
  strIngredient5: null,
  strIngredient6: null,
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strInstructions: "",
  strInstructionsDE: "",
  strInstructionsES: null,
  strInstructionsFR: null,
  strInstructionsIT: "",
  strMeasure1: "",
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
  strMeasure2: "",
  strMeasure3: "",
  strMeasure4: "",
  strMeasure5: null,
  strMeasure6: null,
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strTags: "",
  strVideo: ""
}
};

export const currentDrinkSlice = createSlice({
  name: 'currentDrink',
  initialState,
  reducers: {
    changeCurrentDrink: (state, action) => {
      state.drinks = action.payload
    },
  },
});

export const { changeCurrentDrink } = currentDrinkSlice.actions;
export default currentDrinkSlice.reducer;