const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const User = require('../models/user.schema');
const UserModel = require('../models/user.model');
const connectDB = require('../db');
const mocks = require('./mocks');

connectDB();

let ids = [];

describe.only('testing user model', () => {
  before('add test users', async () => {
    const users = await User.create(mocks.testUsers);
    ids = users.map(user => user._id);
  })

  describe('findUser() function', () => {
    it('should find a user', async () => {
      const user = await UserModel.findUser('peter@peter.peter');
      user.name.should.equal('Peter');
      const user2 = await UserModel.findUser('steven@steven.steven');
      user2.name.should.equal('Steven');
      const fail = await UserModel.findUser();
      expect(fail).to.equal(null);
      const fail2 = await UserModel.findUser('notUser');
      expect(fail2).to.equal(null);
    })
  })

  describe('findUserById() function', () => {
    it('should find user by id', async () => {
      const user = await UserModel.findUserById(mocks.testUsers[0]._id);
      user.name.should.equal('Peter');
    })
  })

  describe('createUser() function', () => {
    it('should create a new user', async () => {
      const newUser = await UserModel.createUser(mocks.createTestUser);
      newUser.name.should.equal('Tester');
    })

    it('should exist in the DB', async () => {
      const user = await User.findOne({name: mocks.createTestUser.name});
      user.password.should.equal('testpass');
    })

    after('delete create test user', async () => {
      await User.findByIdAndDelete(mocks.createTestUser._id);
    })
  })

  after('remove test users', async () => {
    ids.forEach(async id => await User.findByIdAndDelete(id));
  })
})