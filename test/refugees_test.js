var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');
var Refugee = require('../models/refugee');

var refugeeId;
var token;
var user;


beforeEach(function(done) {
  api.post('/api/register')
    .set('Accept', 'application/json')
    .send({ username: "apple", email: "r@gmail.com", password: "password", passwordConfirmation: "password" })
    .end(function(err, res){
      user = res.body.user;
      token = res.body.token;
      done(err);
    });
})


afterEach(function(done) {
  mongoose.connect('mongodb://localhost/refugee-app', function(){
    mongoose.connection.db.dropDatabase(function(){
      Refugee.create({ name: "Pez" }, function(err, refugee){
        refugeeId = refugee._id.toString();
        done(err);
      });
    }); 
  });
});

//all refugees - need to make unsecure route
describe('GET /api/refugees', function() {
  
  it('should return a 200 response when authenticated', function(done) {
    api.get('/api/refugees')
      .set('Accept', 'application/json')
      
      .expect(200, done);
  });
  it('should return a 200 response', function(done) {
    api.get('/api/refugees')
      .set('Accept', 'application/json')
      
      .expect(200, done);
  });

  it('should return an array', function(done) {
    api.get('/api/refugees')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

//add refugee - secure route

describe('POST /api/refugees', function() {
  it('should return a 401 response', function(done) {
    api.post('/api/refugees')
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should return a 200 response', function(done) {
    api.post('/api/refugees')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: "said"
      })
      .expect(200, done);
  });
  it('should add a new refugee and return the refugee object', function(done) {
    api.post('/api/refugees')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: "said"
      })
      .end(function(err, res) {
        expect(res.body.name).to.equal("said");
        console.log(res.body);
        done();
      });
  });
  it('should add the refugee id to the current user object', function(done) {
    console.log("USERID", user._id);
    api.post('/api/refugees')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: "said"
      })
      .end(function(err, res) {
        api.get('/api/charities/' + user._id)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            console.log("new", user);
            expect(res.body.refugees.indexOf(user._id.toString())).to.be.above(-1);
            done();
          })
      });

  })

});

//show refugee
describe('GET /api/refugees/:id', function() {
 
  it('should return a 200 response', function(done) {
    api.get('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      
      .expect(200, done);
  });
  it('should return an object with a specific id', function(done) {
    api.get('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      
      .end(function(err, res) {
        expect(res.body).to.have.property('_id', refugeeId);
        done();
      });
    });
}); 

//update refugees
describe('PUT /api/refugees/:id', function() {
  it('should return a 404 not found', function(done) {
    api.put('/api/refugees'+ refugeeId)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
  it('should return 200 response', function(done) {
    api.put('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: "newpez"
      })
      .expect(200, done);
  });
  it('should return an object with an updated name', function(done) {
    api.put('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: "newpez"
      })
      .end(function(err, res) { 
        expect(res.body.name).to.equal("newpez");
        done();
      });
  }); 
});

describe('DELETE /api/refugees/:id', function() {
  it('should return a 404 response', function(done) {
    api.delete('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .expect(204, done);
  });
  it('should delete the appropriate record from the database', function(done) {
    api.delete('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if(err) done(err);
        api.get('/api/refugees/' + refugeeId)
          .set('Accept', 'application/json')
          .expect(404, done);
      });
  }); 
}); 


describe('PATCH /api/refugees/:id', function() {
  it('should return 200 response', function(done) {
    api.patch('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .send({
        name: "newpezONE"
      })
      .expect(200, done);
  });

  it('should return an object with an updated name', function(done) {
    api.patch('/api/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .send({
        name: "newpez"
      })
      .end(function(err, res) { 
        expect(res.body.name).to.equal("newpez");
        done();
      });
  }); 

});  
