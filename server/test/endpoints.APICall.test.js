const express = require('express');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const mocks = require('./mocks');
const {connectDB} = require('../db');
const User = require('../models/user.schema');
const Cocktail = require('../models/cocktail.schema');
const router = require('../router');
const config = require('config');

const testJWT1 = 'Bearer ' + jwt.sign({_id: mocks.testUsers[0]._id}, config.get('jwtSecret'));
const testJWT2 = 'Bearer ' + jwt.sign({_id: mocks.testUsers[1]._id}, config.get('jwtSecret'));

const app = express();
app.use(express.json());
app.use(router);

const request = supertest(app);

describe('test server endpoints', () => {
  before('connect to db', async () => {
    await connectDB('controller-endpoints');
  })
  
  beforeEach('create test data', async () => {
    await User.deleteMany();
    await Cocktail.deleteMany();
    await User.create(mocks.testUsers);
    await Cocktail.create(mocks.testCocktails);
  })


  //no auth required
  describe('does not require user auth', () => {
    describe('non-covered endpoint', () => {
      it('should return error message', async () => {
        const res = await request.get('/wrong');
        expect(res.text).to.equal('Sorry, not found 😞');
      })
    })  
  
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
        const res = await request.post('/register')
          .send(mocks.dupeRegisterUser);
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('User already exists');
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
  
    describe('GET /cocktails', () => {
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

    describe('GET /cocktail/:id', () => {
      it('should return the specified cocktail', async () => {
        const res = await request.get(`/cocktail/${mocks.testCocktails[1]._id.toString()}`);
        expect(res.body.name).to.equal('Please work');
      })
    })
  })


  // requires auth
  describe('requires user auth', () => {
    describe('GET /', () => {
      it('should return user info', async () => {
        const res1 = await request.get('/')
          .set('Authorization', testJWT1);
        expect(res1.body.name).to.equal('Peter');
        const res2 = await request.get('/')
          .set('Authorization', testJWT2);
        expect(res2.body.name).to.equal('Steven');
      })
    })

    describe('GET /myCocktails', () => {
      it('should return user\'s cocktails', async () => {
        const res = await request.get('/myCocktails')
          .set('Authorization', testJWT1);
        expect(res.body.length).to.equal(2);
        expect(res.body.map(d => d.name)).to.include('Please work' && 'Final test');
        const res2 = await request.get('/myCocktails')
          .set('Authorization', testJWT2);
        expect(res2.body.length).to.equal(0);
      })
    })

    describe('POST /', () => {
      it('should create a new cocktail', async () => {
        const create = await request.post('/')
          .set('Authorization', testJWT2)
          .send(mocks.newCocktail);
        expect(create.status).to.equal(201);
        const found = await Cocktail.findOne({name: mocks.newCocktail.name});
        expect(found._doc).to.haveOwnProperty('name' && 'instructions' && 'picture');
        expect(found._doc.picture).to.equal('fakeurl.web');
      })
    })

    describe('PUT /myCocktails/:id', () => {
      it('should update a cocktail', async() => {
        await request.put(`/myCocktails/${mocks.testCocktails[1]._id}`)
          .set('Authorization', testJWT1)
          .send({name: 'Updated!'});
        const res = (await Cocktail.find()).map(c => c.name);
        res.should.include('Updated!');
      })
    })

    describe('DELETE /myCocktails/:id', () => {
      it('should delete a cocktail', async() => {
        await request.delete(`/myCocktails/${mocks.testCocktails[1]._id}`)
          .set('Authorization', testJWT1);
        const res = (await Cocktail.find()).map(c => c.name);
        res.length.should.equal(2);
        res.should.not.include('Please work');
      })
    })

    describe('PUT /myList', () => {
      it('should update a user list', async () => {
        await request.put('/myList')
          .set('Authorization', testJWT1)
          .send({drinkID: 10001});
        const user1 = await User.findById(mocks.testUsers[0]._id);
        // expect(user1.savedDrinks[0]).to.equal("1");
        // expect(user1.savedDrinks[1]).to.equal("10001");
        await request.put('/myList')
          .set('Authorization', testJWT1)
          .send({drinkID: 10001});
        const user2 = await User.findById(mocks.testUsers[0]._id);
        expect(user2.savedDrinks[0]).to.equal("1");
        expect(user2.savedDrinks[1]).to.equal(undefined);
      })
    })
  })
})
