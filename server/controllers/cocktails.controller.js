const Cocktail = require('../models/cocktail.model');

exports.getMyCocktails = async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.status(200).send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error, { message: 'Could not get all the cocktails' });
  }
};

exports.createCocktail = async (req, res) => {
  try {
    const { name, ingredients, instructions, picture } = req.body;
    if (!name || !ingredients || !instructions || !picture) {
      return res.status(400).send('Please provide all information needed');
    }
    const cocktail = await Cocktail.create({ ...req.body });
    res.status(201).send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error, { message: 'Could not create cocktail' });
  }
};
