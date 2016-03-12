var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');
var User = require('../models/user');

afterEach(function(done) {
  mongoose.connect('mongodb://localhost/refugee-app', function(){
    mongoose.connection.db.dropDatabase(function(){
      done();
    }); 
  });
});

describe('POST /login', function() {

  before(function(done) {
    api.post('/register')
      .set('Accept', 'application/json')
      .send({ username: "danielle", email: "danielle@gmail.com", password: "password", passwordConfirmation: "password" })
      .end(function(err, res){
        done(err);
      });
  });
  it('should generate a token at login', function(done) {
    api.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: "danielle@gmail.com",
        password: "password"
      })
      .end(function(err, res) {
        expect(res.body.token).to.be.a('string');
        done();
      })
  });
});


describe('POST /register', function() {
  it('should generate a token on registration', function(done) {
    api.post('/register')
      .set('Accept', 'application/json')
      .send({
        username: "ilan",
        email: "ilan@gmail.com",
        password: "password",
        passwordConfirmation: "password"
      })
      .end(function(err, res) {
        expect(res.body.token).to.be.a('string');
        done();
      })
  });
});

