const express = require('express');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const sinon = require('sinon');
const mocks = require('./mocks');
const {connectDB} = require('../db');
const User = require('../models/user.schema');
const Cocktail = require('../models/cocktail.schema');
const config = require('config');
const router = require('../router');


const testJWTCorrect = 'Bearer ' + jwt.sign({_id: mocks.createTestUser._id}, config.get('jwtSecret'));
const testJWTWrongUser = 'Bearer ' + jwt.sign({_id: mocks.createTestCocktail._id}, 'test-secret-key');

const app = express();
app.use(express.json());
app.use(router);

const request = supertest(app);

describe.only('test server endpoints', () => {
  before('connect to db', async () => {
    await connectDB('controller-endpoints');
  })
  
  beforeEach('create test data', async () => {
    await User.deleteMany();
    await Cocktail.deleteMany();
    await User.create(mocks.testUsers);
    await Cocktail.create(mocks.testCocktails);
  })

  
  // No auth required:
  describe('POST /register', () => {
    it('should create a new user', async () => {
      const res = await request.post('/register')
        .send(mocks.registerUser);
      expect(res.status).to.equal(201);
      expect(res.body).to.haveOwnProperty('accessToken');
    })

    it('should fail if not sent full info', async () => {
      const res = await request.post('/register')
        .send(mocks.loginUser);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Please fill in all fields');
    })

    it('should fail if user exists or passwords don\'t match', async () => {
      const resDupe = await request.post('/register')
        .send(mocks.dupeRegisterUser);
      const resMismatch = await request.post('/register')
        .send(mocks.registerUserMismatchPass);
      expect(resDupe.status).to.equal(409);
      expect(resDupe.body.message).to.equal('User already exists');
      expect(resMismatch.status).to.equal(409);
      expect(resMismatch.body.message).to.equal('Enter valid password, ensure both passwords match');
    })
  })

  describe('POST /login', () => {
    it('should log a user in', async () => {
      const res = await request.post('/login')
        .send(mocks.loginUser);
      expect(res.status).to.equal(200);
      expect(res.body).to.haveOwnProperty('accessToken');
    })

    it('should fail if not sent full info', async () => {
      const res = await request.post('/login')
        .send({ email: "email"});
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Please fill in all fields');
    })

    it('should fail if no user or password not a match', async () => {
      const resNoUser = await request.post('/login')
        .send({ email: 'h', password: 'l' });
      const resBadPass = await request.post('/login')
        .send({ email: 'steven@steven.steven', password: 'wrongpass'});
      expect(resNoUser.status && resBadPass.status).to.equal(409);
      expect(resNoUser.body.message && resBadPass.body.message).to.equal('Invalid credentials');
    })
  })

  describe.only('GET /cocktails', () => {
    it('should return all user cocktails', async () => {
      const res = await request.get('/cocktails')
      res.status.should.equal(200);
      res.body.length.should.equal(3);
      await Cocktail.create(mocks.createTestCocktail);
      const res2 = await request.get('/cocktails')
      res2.body.length.should.equal(4);
      res2.body.map(r => r.name).should.include('newly created' && 'Test');
    })
  })

  after('disconnect db', async () => {
    await mongoose.connection.close();
  })
})
