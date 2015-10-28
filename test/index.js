var request = require('supertest');
var app = require('./../server/server');
var expect = require('chai').expect;

describe('Express', function() {
  describe('Creating routes', function(done) {
    it('GET request to /messages return status code of 200', function() {
      request(app)
        .get('/messages')
        .expect(200,done);
    });

    it('GET request to /messages returns messages array of message', function(done) {
      request(app)
        .get('/messages')
        .end(function(err, res) {
          expect(JSON.parse(res.text)).to.be.a('array');
          done();
        });
    });

    it('POST request to /messages returns status code of 200 if message formatted correctly', function(done) {
      request(app)
        .post('/messages')
        .send({message: 'test', created_by: 'tester'})
        .expect(200,done);
    });

    it('POST request to /messages returns status code of 200 if message formatted correctly', function(done) {
      request(app)
        .post('/messages')
        .send({message: 'test'})
        .expect(200,done);
    });

    it('POST request to /messages returns success object if message formatted correctly', function(done) {
      request(app)
        .post('/messages')
        .send({message: 'test', created_by: 'tester'})
        .set('Authorization', 'Basic secret_key')
        .end(function(err, res) {
          expect(JSON.parse(res.text)).to.have.property('success');
          done();
        });
    });

    it('POST request to /messages returns error object if message formatted incorrectly', function(done) {
      request(app)
        .post('/messages')
        .send({message: 'test'})
        .set('Authorization', 'Basic secret_key')
        .end(function(err, res) {
          var body = JSON.parse(res.text);
          expect(body).to.have.property('error');
          expect(body.error).to.eql('Your POST request was unsuccessful');
          done();
        });
    });
  });

  describe('Authorization',function(done) {
    it('Unauthorized users should be sent denied object', function(done) {
      request(app)
        .post('/messages')
        .send({message: 'test', created_by: 'tester'})
        .set('Authorization', 'Basic incorrect_key')
        .end(function(err, res) {
          var body = JSON.parse(res.text);
          expect(body).to.have.property('error');
          expect(body.error).to.eql('Your password is incorrect');
          done();
        });
    });

    it('Unauthorized users should be sent denied object', function(done) {
      request(app)
        .post('/messages')
        .send({message: 'test', created_by: 'tester'})
        .set('Authorization', 'secret_key')
        .end(function(err, res) {
          var body = JSON.parse(res.text);
          expect(body).to.have.property('error');
          expect(body.error).to.eql('Your password is incorrect');
          done();
        });
    });
  });

});
