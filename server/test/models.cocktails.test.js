const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const Cocktail = require('../models/cocktail.schema');
const CocktailModel = require('../models/cocktail.model');
const {connectDB} = require('../db');
const mocks = require('./mocks');
const mongoose = require('mongoose');

let ids = [];

describe('testing cocktail model', () => {
  before('connect to db', async () => {
    await connectDB('model-cocktails');
  })
  
  beforeEach('create test drinks', async () => {
    await Cocktail.deleteMany();
    const drinks = await Cocktail.create(mocks.testCocktails);
    ids = drinks.map(drink => drink._id);
  });
  
  afterEach('delete test drinks', async () => {
    ids.forEach(async id => await Cocktail.findByIdAndDelete(id));
  });

  describe('findCocktails() function', () => {
    it('should return all cocktails', async () => {
      const cocktails = await CocktailModel.findCocktails();
      const cocktailNames = cocktails.map(drink => drink.name);
      expect(cocktails).to.be.an('array');
      expect(cocktails.length).to.be.gte(3);
      cocktailNames.should.include('Test', 'Please work', 'Final test');
    })
  
    it('should return a specific cocktail', async () => {
      const drink0 = await CocktailModel.findCocktails("name", "Test");
      const drink1 = await CocktailModel.findCocktails('instructions', "Steam it");
      const drink2 = await CocktailModel.findCocktails('name', "Final test");
      drink0[0].instructions.should.equal("Broil it");
      drink1[0].name.should.equal('Please work');
      drink2[0].instructions.should.equal('Bake it');
    })
  })

  describe('getSingleCocktail() function', () => {
    it('should return a cocktail using id', async () => {
      const cocktail = await CocktailModel.getSingleCocktail(mocks.testCocktails[0]._id.toString());
      const failed = await CocktailModel.getSingleCocktail();
      cocktail.name.should.equal('Test');
      expect(failed).to.equal(null);
    })
  })

  describe('createCocktail() function', () => {
    it('should create a cocktail', async () => {
      const newDrink = await CocktailModel.createCocktail(mocks.createTestCocktail);
      newDrink.name.should.equal('newly created');
      const cocktail = await Cocktail.findOne({name: "newly created"});
      cocktail.instructions.should.equal("Fry it");
    })

    after('delete new entry', async () => {
      await Cocktail.findByIdAndDelete(mocks.createTestCocktail._id);
    })
  })

  describe('updateCocktail() function', () => {
    it('should update a cocktail', async () => {
      const updated = await CocktailModel.updateCocktail(mocks.testCocktails[0]._id.toString(), mocks.updatedCocktail);
      const failed = await CocktailModel.updateCocktail();
      updated.name.should.equal(mocks.updatedCocktail.name);
      updated.picture.should.equal(mocks.updatedCocktail.picture);
      expect(failed).to.equal(null);
    })
  })

  describe('deleteCocktail() function', () => {
    it('should delete a cocktail', async () => {
      await Cocktail.create(mocks.createTestCocktail);
      const all = await Cocktail.find();
      const deleted = await CocktailModel.deleteCocktail(mocks.createTestCocktail._id);
      const newAll = await Cocktail.find();
      deleted.name.should.equal("newly created");
      newAll.length.should.equal(all.length - 1);
    })
  })
})