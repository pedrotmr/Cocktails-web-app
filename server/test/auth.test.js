const express = require('express');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const sinon = require('sinon');
const { authMiddleware } = require('../middlewares/auth');
const mocks = require('./mocks');
const {connectDB} = require('../db');
const User = require('../models/user.schema');
const config = require('config');

const testJWTCorrect = 'Bearer ' + jwt.sign({_id: mocks.createTestUser._id}, config.get('jwtSecret'));
const testJWTWrongUser = 'Bearer ' + jwt.sign({_id: mocks.createTestCocktail._id}, 'test-secret-key');


function testNext(req, res) {
  res.status(261).send('next func reached');
};

const testCallback = sinon.spy(testNext);

const app = express();
app.use(express.json());
app.get('/authTest', authMiddleware, testCallback);

const request = supertest(app);

describe('test user auth', () => {
  
  before('create test user', async () => {
    connectDB('auth-middleware');
    await User.deleteMany();
    await User.create(mocks.createTestUser);
  })

  it('should return 403 if no JWT', async () => {
    const res = await request.get('/authTest')
    res.status.should.equal(403);
  })

  it('should return 401 if the user does not exist or false JWT', async () => {
    const res = await request.get('/authTest')
      .set('Authorization', testJWTWrongUser);
    res.status.should.equal(401);
  })

  it('should call next() if verified JWT and user', async () => {
    const res = await request.get('/authTest')
      .set('Authorization', testJWTCorrect);
      res.status.should.equal(261);
      res.text.should.equal('next func reached');
    expect(testCallback.calledOnce).to.be.true;
  })

  after('remove test user', async () => {
    await User.findByIdAndDelete(mocks.createTestUser._id);
  })
})
