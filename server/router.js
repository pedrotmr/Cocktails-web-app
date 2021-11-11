const router = require('express').Router();
const controller = require('./controller/cocktails.controller');

router.get('/', controller.getAllCocktails);
// router.get('/:strDrink', controller.getCocktailByName);
// router.get('/:idDrink', controller.getCocktailById);
// router.get('/:ingridient', controller.getCocktailsByIngridient);
// router.delete('/:id', controller.deleteCocktail);
router.post('/', controller.createCocktail);

module.exports = router;
