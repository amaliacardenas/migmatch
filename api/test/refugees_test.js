var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');
var Refugee = require('../models/refugee');

var refugeeId;




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


describe('GET /refugees', function() {
  it('should return a 200 response', function(done) {
    api.get('/refugees')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', function(done) {
    api.get('/refugees')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done();
      });
  });
});



describe('POST /refugees', function() {
  it('should return a 200 response', function(done) {
    api.post('/refugees')
      .set('Accept', 'application/json')
      .send({
        name: "said"
      })
      .expect(200, done);
  });
  it('should add a new refugee and return the refugee object', function(done) {
    api.post('/refugees')
      .set('Accept', 'application/json')
      .send({
        name: "said"
      })
      .end(function(err, res) {
        expect(res.body.name).to.equal("said");
        done();
      });
  });

});


describe('GET /refugees/:id', function() {
  it('should return a 200 response', function(done) {
    api.get('/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an object with a specific id', function(done) {
    api.get('/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.have.property('_id', refugeeId);
        done();
      });
    });
}); 


describe('PUT /refugees/:id', function() {
  it('should return 404 response', function(done) {
    api.put('/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .send({
        name: "newpez"
      })
      .expect(200, done);
  });
  it('should return an object with an updated name', function(done) {
    api.put('/refugees/' + refugeeId)
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

describe('DELETE /refugees/:id', function() {
  it('should return a 404 response', function(done) {
    api.delete('/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .expect(204, done);
  });
  it('should delete the appropriate record from the database', function(done) {
    api.delete('/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if(err) done(err);
        api.get('/refugees/' + refugeeId)
          .set('Accept', 'application/json')
          .expect(404, done);
      });
  }); 
}); 


describe('PATCH /refugees/:id', function() {
  it('should return 200 response', function(done) {
    api.patch('/refugees/' + refugeeId)
      .set('Accept', 'application/json')
      .send({
        name: "newpezONE"
      })
      .expect(201, done);
  });

  it('should return an object with an updated name', function(done) {
    api.patch('/refugees/' + refugeeId)
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
