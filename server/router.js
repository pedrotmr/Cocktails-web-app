const router = require('express').Router();
const drinksController = require('./controllers/cocktails.controller');
const userController = require('./controllers/user.controller');
const { authMiddleware } = require('./middlewares/auth');

// Drinks
router.get('/', drinksController.getUsersCocktails);
router.post('/', drinksController.createCocktail);
router.put('/:id', drinksController.updateCocktail);
router.delete('/:id', drinksController.deleteCocktail);
// router.get('/', authMiddleware, drinksController.getUsersCocktails);
// router.post('/', authMiddleware, drinksController.createCocktail);
// router.put('/:id', authMiddleware, drinksController.updateCocktail);
// router.delete('/:id', authMiddleware, drinksController.deleteCocktail);

// User
router.post('/register', userController.create);
router.post('/login', userController.login);
// router.post('/logout', authMiddleware, userController.logout);

//Error
router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
