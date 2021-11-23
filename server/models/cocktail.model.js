const Cocktail = require('../models/cocktail.schema');

async function findCocktails (key, value) {
  return key && value 
    ? await Cocktail.find({ [key]: value })
    : await Cocktail.find();
}

async function getSingleCocktail(id) {
  return await Cocktail.findById(id);
}

async function createCocktail(cocktail) {
  return Cocktail.create(cocktail);
}

async function updateCocktail(id, updates) {
  return await Cocktail.findByIdAndUpdate(id, updates, { returnDocument: 'after'});
}

async function deleteCocktail(id) {
  return Cocktail.findByIdAndDelete(id);
}

module.exports = {
  findCocktails,
  getSingleCocktail,
  createCocktail,
  updateCocktail,
  deleteCocktail
}