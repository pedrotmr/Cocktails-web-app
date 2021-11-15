const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
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
