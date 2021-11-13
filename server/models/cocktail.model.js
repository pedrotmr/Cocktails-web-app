const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cocktail', cocktailSchema);
