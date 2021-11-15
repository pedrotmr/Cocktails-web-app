const Cocktail = require('../models/cocktail.model');

exports.getAllUsersCocktails = async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get all the cocktails');
  }
};

exports.getAllMyCocktails = async (req, res) => {
  try {
    const cocktails = await Cocktail.find({ user: req.user.id });
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get your cocktails');
  }
};

exports.getCocktail = async (req, res) => {
  try {
    const cocktails = await Cocktail.findById(req.params.id);
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not get the cocktail');
  }
};

exports.createCocktail = async (req, res) => {
  const { name, ingredients, instructions, picture } = req.body;
  try {
    if (!name || !ingredients || !instructions || !picture) {
      return res.status(400).send('Please provide all information needed');
    }
    const cocktail = await Cocktail.create({ ...req.body, user: req.user.id });
    res.status(201).send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not create cocktail');
  }
};

exports.updateCocktail = async (req, res) => {
  const { name, ingredients, instructions, picture } = req.body;

  const cocktailDetails = {};
  if (name) cocktailDetails.name = name;
  if (ingredients) cocktailDetails.ingredients = ingredients;
  if (instructions) cocktailDetails.instructions = instructions;
  if (picture) cocktailDetails.picture = picture;

  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).send('Cocktail not found');
    if (cocktail.user._id.toString() != req.user._id) {
      return res.status(401).send('Not authorized');
    }
    const updated = await Cocktail.findByIdAndUpdate(req.params.id, {
      $set: cocktailDetails,
    });
    res.status(201).send(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not update cocktail');
  }
};

exports.deleteCocktail = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).send('Cocktail not found');
    if (cocktail.user._id.toString() != req.user._id) {
      return res.status(401).send('Not authorized');
    }
    await Cocktail.findByIdAndRemove(req.params.id);
    res.status(201).send('Cocktail removed');
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not delete cocktail');
  }
};
