const router = require('express').Router();
const drinksController = require('./controllers/cocktails.controller');
const userController = require('./controllers/user.controller');
const authMiddleware = require('./middlewares/auth');

// Drinks
router.get('/', authMiddleware, drinksController.getMyCocktails);
router.post('/postdrink', authMiddleware, drinksController.createCocktail);

// User
router.post('/register', userController.create);
router.post('/login', userController.login);
// router.post('/logout', authMiddleware, userController.logout);

//Error
router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;
