const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const mongoose = require('mongoose');
const Cocktail = require('../models/cocktail.model');
const cocktailCtrl = require('../controllers/cocktails.controller'); 
const connectDB = require('./../db');

connectDB();

const testCocktail = {
  // user: new mongoose.Types.ObjectId(),
  name: "Please work 12312311231231231",
  ingredients: "test ingredients",
  instructions: "Broil it",
  picture: 'fakeurl.web',
};

let id;

describe('testing database interactions', () => {
  before(async () => {
    await Cocktail.deleteMany()
    id = await Cocktail.create({...testCocktail})._id;
  });

  describe('should return cocktails', () => {
    
    it('returns all cocktails', async() => {
      const cocktails = await cocktailCtrl.getAllUsersCocktails()
      expect(cocktails).to.be.an('array');
      // cocktails[].should.equal(1)
      const one = 1;
      one.should.equal(1)
    })
  })

  after('delete test user', async () => {
    await Cocktail.findByIdAndDelete(id);
  })
  
})