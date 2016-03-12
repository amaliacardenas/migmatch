var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');
var Refugee = require('../models/refugee');

var refugeeId;

// afterEach(function(done) {
//   mongoose.connect('mongodb://localhost/refugee-app', function(){
//     mongoose.connection.db.dropDatabase(function(){
//       Refugee.create({ name: "Pez" }, function(err, refugee){
//         console.log(refugee);
//         refugeeId = refugeeId._id.toString();
//         done(err);
//       });
//     }); 
//   });
// });


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
