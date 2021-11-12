const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  // name
  idDrink: {
    type: String,
    required: true,
  },
  // name
  strDrink: {
    type: String,
    required: true,
  },
  // flavours
  strTags: {
    type: Date,
    required: false,
  },
  // alcoholic or not
  strAlcoholic: {
    type: String,
    required: true,
  },
  // glass
  strGlass: {
    type: String,
    required: false,
  },
  // instructions
  strInstructions: {
    type: Date,
    required: true,
  },
  // picture
  strDrinkThumb: {
    type: String,
    required: true,
  },
  // ingridient 1
  strIngredient1: {
    type: String,
    required: true,
  },
  strMeasure1: {
    type: Date,
    required: true,
  },
  // ingridient 2
  strIngredient2: {
    type: String,
    required: true,
  },
  strMeasure2: {
    type: Date,
    required: true,
  },
  // ingridient 3
  strIngredient3: {
    type: String,
    required: true,
  },
  strMeasure3: {
    type: Date,
    required: true,
  },
  // ingridient 4
  strIngredient4: {
    type: String,
    required: false,
  },
  strMeasure4: {
    type: Date,
    required: false,
  },
  // ingridient 5
  strIngredient5: {
    type: String,
    required: false,
  },
  strMeasure5: {
    type: Date,
    required: false,
  },
  // ingridient 6
  strIngredient6: {
    type: String,
    required: false,
  },
  strMeasure6: {
    type: Date,
    required: false,
  },
  // ingridient 7
  strIngredient7: {
    type: String,
    required: false,
  },
  strMeasure7: {
    type: Date,
    required: false,
  },
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;
