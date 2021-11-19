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
    user: new mongoose.Types.ObjectId(),
    name: "Please work",
    ingredients: "test ingredients",
    instructions: "Steam it",
    picture: 'fakeurl.web',
  },
  {
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
    name: "Steven",
    email: "steven@steven.steven",
    password: "wordpass"
  },
  {
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

module.exports = mocks;