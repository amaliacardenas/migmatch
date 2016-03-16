var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');
var User = require('../models/user');

afterEach(function(done) {
  mongoose.connect('mongodb://localhost/refugee-app', function(){
    
      User.create({ username: "lara", email: "y@gmail.com", password: "password", passwordConfirmation: "password" }, function(err, user){
        userId = user._id.toString();
        done(err);
    
    }); 
  });
});

//get all charities
describe('GET /api/charities', function() {
  before(function(done) {
    api.post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: "danielle", name: "dna", email: "danielle@gmail.com", password: "password", passwordConfirmation: "password" })
      .end(function(err, res){
        done(err);
      });
  });
  it('should return a 200 response', function(done) {
    api.get('/api/charities')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an array', function(done) {
    api.get('/api/charities')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        console.log(res.body);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});  


//update charity

describe('PUT /api/charities/:id', function() {
  it('should return 200 response', function(done) {
    api.put('/api/charities/' + userId)
      .set('Accept', 'application/json')
      .send({ username: "alpha", email: "y@gmail.com", password: "password", passwordConfirmation: "password" })
      .expect(200, done);
  });
  it('should return an object with an updated username', function(done) {
    api.put('/api/charities/' + userId)
      .set('Accept', 'application/json')
      .send({ username: "alpha", email: "y@gmail.com", password: "password", passwordConfirmation: "password" })
      .end(function(err, res) { 
        expect(res.body.username).to.equal("alpha");
        done();
      });
       });
});  


//show charity


describe('GET /api/charities/:id', function() {
  it('should return a 200 response', function(done) {
    api.get('/charities/' + userId)
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an object with a specific id', function(done) {
    api.get('/api/charities/' + userId)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.have.property('_id', userId);
        done();
      });
    });
});