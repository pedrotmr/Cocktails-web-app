const router = require('express').Router();
const drinksController = require('./controllers/cocktails.controller');
const userController = require('./controllers/user.controller');
const { authMiddleware } = require('./middlewares/auth');

// Drinks
router.get('/cocktails', drinksController.getAllUsersCocktails);
router.get('/myCocktails', authMiddleware, drinksController.getAllMyCocktails);
router.get('/cocktail/:id', drinksController.getCocktail);
router.post('/',authMiddleware, drinksController.createCocktail);
router.put('/:id', authMiddleware, drinksController.updateCocktail);
router.delete('/:id', authMiddleware, drinksController.deleteCocktail);

// User
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/', authMiddleware, userController.loadUser);

//Error
router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
