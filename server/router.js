const router = require('express').Router();
const drinksController = require('./controllers/cocktails.controller');
const userController = require('./controllers/user.controller');
const { authMiddleware } = require('./middlewares/auth');

// Drinks
router.get('/', drinksController.getAllUsersCocktails); //works
router.get('/myCocktails', authMiddleware, drinksController.getAllMyCocktails); //works
router.get('/:id', authMiddleware, drinksController.getCocktail); //works
router.post('/', authMiddleware, drinksController.createCocktail); //works
router.put('/:id', authMiddleware, drinksController.updateCocktail);
router.delete('/:id', authMiddleware, drinksController.deleteCocktail);

// User
router.post('/register', userController.create);
router.post('/login', userController.login);
// router.post('/logout', authMiddleware, userController.logout);

//Error
router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
