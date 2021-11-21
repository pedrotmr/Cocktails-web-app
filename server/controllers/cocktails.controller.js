const CocktailModel = require('../models/cocktail.model');

exports.getAllUsersCocktails = async (req, res) => {
  try {
    const cocktails = await CocktailModel.findCocktails();
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get all the cocktails');
  }
};

exports.getCocktail = async (req, res) => {
  console.log(req.params)
  try {
    const cocktail = await CocktailModel.getSingleCocktail(req.params.id);
    res.status(200).send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get the cocktail');
  }
};

exports.createCocktail = async (req, res) => {
  const { name, ingredients, instructions, picture } = req.body;
  const id = req.user._id;
  try {
    if (!name || !ingredients || !instructions || !picture) {
      return res.status(400).send('Please provide all information needed');
    }
    const cocktail = await CocktailModel.createCocktail({ ...req.body, user: id });
    res.status(201).send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not create cocktail');
  }
};

// DID NOT USE DO FAR
exports.getAllMyCocktails = async (req, res) => {
  try {
    const cocktails = await CocktailModel.findCocktails("user", req.user._id);
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get your cocktails');
  }
};

// DID NOT USE DO FAR
exports.updateCocktail = async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  const cocktailDetails = {};
  if (name) cocktailDetails.name = name;
  if (ingredients) cocktailDetails.ingredients = ingredients;
  if (instructions) cocktailDetails.instructions = instructions;

  try {
    const cocktail = await CocktailModel.getSingleCocktail(req.params.id);
    if (!cocktail) return res.status(404).send('Cocktail not found');
    if (cocktail.user.toString() !== req.user._id.toString()) {
      return res.status(401).send('Not authorized');
    }
    const updated = await CocktailModel.updateCocktail(req.params.id, cocktailDetails);
    res.status(201).send(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not update cocktail');
  }
};

// DID NOT USE DO FAR
exports.deleteCocktail = async (req, res) => {
  try {
    const cocktail = await CocktailModel.getSingleCocktail(req.params.id);
    if (!cocktail) return res.status(404).send('Cocktail not found');
    if (cocktail.user.toString() !== req.user._id.toString()) {
      return res.status(401).send('Not authorized');
    }
    await CocktailModel.deleteCocktail(req.params.id);
    res.status(201).send('Cocktail removed');
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not delete cocktail');
  }
};
