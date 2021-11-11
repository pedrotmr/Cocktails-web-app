const Cocktail = require('../models/cocktail.model');

exports.getAllCocktails = async (req, res) => {
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
    const {
      strDrink,
      strAlcoholic,
      strInstructions,
      strDrinkThumb,
      strIngredient1,
      strIngredient2,
      strMeasure2,
      strIngredient3,
      strMeasure3,
    } = req.body;
    if (
      !strDrink ||
      !strAlcoholic ||
      !strInstructions ||
      !strDrinkThumb ||
      !strIngredient1 ||
      !strIngredient2 ||
      !strMeasure2 ||
      !strIngredient3 ||
      !strMeasure3
    ) {
      return res.status(400).send('Please provide all information needed');
    }
    const cocktail = await Cocktail.create({
      strDrink,
      strAlcoholic,
      strInstructions,
      strDrinkThumb,
      strIngredient1,
      strIngredient2,
      strMeasure2,
      strIngredient3,
      strMeasure3,
    });
    res.status(201).send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(500).send(error, { message: 'Could not create cocktail' });
  }
};
