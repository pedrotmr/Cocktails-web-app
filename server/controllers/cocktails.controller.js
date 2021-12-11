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
  try {
    const cocktail = await CocktailModel.getSingleCocktail(req.params.id);
    res.status(200).send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get the cocktail');
  }
};

exports.createCocktail = async (req, res) => {
  const cocktail = req.body;
  const id = req.user._id;
  try {
    if (!cocktail.name || !cocktail.ingredients || !cocktail.instructions) {
      return res.status(400).send('Please provide all information needed');
    }
    if (!cocktail.picture) cocktail.picture = "https://assets.dragoart.com/images/167030_502/how-to-draw-a-martini-step-7_5e4ccafd6f4580.52436546_95160_5_3.gif"
    const cocktailCreation = await CocktailModel.createCocktail({ ...cocktail, user: id });
    res.status(201).send(cocktailCreation);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not create cocktail');
  }
};

exports.getAllMyCocktails = async (req, res) => {
  try {
    const cocktails = await CocktailModel.findCocktails("user", req.user._id);
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get your cocktails');
  }
};

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
