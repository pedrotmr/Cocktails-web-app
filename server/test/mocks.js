const mongoose = require('mongoose');

var mocks = {};

mocks.testCocktails = [
  {
    _id: mongoose.Types.ObjectId("6197d84878eb0c27e8ea6dbc"),
    user: new mongoose.Types.ObjectId(),
    name: "Test",
    ingredients: "test ingredients",
    instructions: "Broil it",
    picture: 'fakeurl.web',
  },
  {
    _id: mongoose.Types.ObjectId("6197d84878eb0c27e8ea32ae"),
    user: new mongoose.Types.ObjectId(),
    name: "Please work",
    ingredients: "test ingredients",
    instructions: "Steam it",
    picture: 'fakeurl.web',
  },
  {
    _id: mongoose.Types.ObjectId("6197d84878eb0c27e8ea5aaa"),
    user: new mongoose.Types.ObjectId(),
    name: "Final test",
    ingredients: "test ingredients",
    instructions: "Bake it",
    picture: 'fakeurl.web',
  }
]

mocks.createTestCocktail = {
  _id: new mongoose.Types.ObjectId("6197d84878eb0c27e8ea4eee"),
  user: new mongoose.Types.ObjectId(),
  name: "newly created",
  ingredients: "bananas",
  instructions: "Fry it",
  picture: 'fakeurl.web',
}

mocks.updatedCocktail = {
  name: "updated",
  ingredients: "space time fabric",
  instructions: "ShakeNBake it",
  picture: 'NEWfakeurl.web',
}


mocks.testUsers = [
  {
    _id: new mongoose.Types.ObjectId("6196bb716c33f7f7c8cfaed3"),
    name: "Peter",
    email: "peter@peter.peter",
    password: "wordpass"
  },
  {
    _id: new mongoose.Types.ObjectId("6196bb716c33f7f7c8cfccc1"),
    name: "Steven",
    email: "steven@steven.steven",
    password: "wordpass"
  },
  {
    _id: new mongoose.Types.ObjectId("6196bb716c33f7f7c8cf61aa"),
    name: "Joseph",
    email: "joseph@joseph.joseph",
    password: "wordpass"
  },
]

mocks.createTestUser = {
  _id: new mongoose.Types.ObjectId("6196bb716c33f7f7c8cfaee5"),
  name: "Tester",
  email: "test@test.test",
  password: "testpass"
}

mocks.registerUser = {
  name: "Test Register",
  email: "register@register.register",
  password: 'pass',
  password2: 'pass',
}

mocks.registerUserMismatchPass = {
  name: "Test Register",
  email: "register@register.register",
  password: 'pass',
  password2: 'ssap',
}

mocks.dupeRegisterUser = {
  name: "Steven",
  email: "steven@steven.steven",
  password: "wordpass",
  password2: 'wordpass'
}

mocks.loginUser = {
  email: "register@register.register",
  password: 'pass',
}

module.exports = mocks;