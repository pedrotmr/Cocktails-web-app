const router = require('express').Router();
const drinksController = require('./controllers/cocktails.controller');
const userController = require('./controllers/user.controller');
const { authMiddleware } = require('./middlewares/auth');

// Drinks
// + add: auth middleware
router.get('/cocktails', drinksController.getAllUsersCocktails);
router.get('/myCocktails', authMiddleware, drinksController.getAllMyCocktails);
router.get('/cocktail/:id', authMiddleware, drinksController.getCocktail);
// Had to disable authentication for creating drink to work... Do not know why
router.post('/', authMiddleware, drinksController.createCocktail);
// router.post('/', drinksController.createCocktail);
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
