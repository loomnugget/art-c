'use strict';

// bringing in test environment
require('./lib/test-env.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
// const AWS = require('aws-sdk-mock');

// app modules
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db');
const mockUser = require('./lib/user-mocks');
const mockArtist = require('./lib/artist-mock');

mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleArtist = {
  firstname: 'Jimbob',
  lastname: 'Jimbobberson',
  username: 'Jimbobguy316',
  email: 'jimbobguy14@stuff.com',
  city: 'Dallas',
  zip: '98114',
  about: 'I\m just a simple kinda man who likes to do art stuff.',
  phone: '(555)555-5555',
};

describe('testing artist-router', function() {

  before( done => serverCtrl.serverUp(server, done));

  after( done => serverCtrl.serverDown(server, done));

  afterEach( done => cleanDB(done));

  describe('testing POST /api/artist', function() {

    describe('with a valid body', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 200', (done) => {

        request.post(`${url}/api/artist`)
      .send(exampleArtist)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.firstname).to.equal(exampleArtist.firstname);
        expect(res.body.lastname).to.equal(exampleArtist.lastname);
        expect(res.body.username).to.equal(exampleArtist.username);
        expect(res.body.email).to.equal(exampleArtist.email);
        expect(res.body.city).to.equal(exampleArtist.city);
        expect(res.body.zip).to.equal(exampleArtist.zip);
        expect(res.body.about).to.equal(exampleArtist.about);
        expect(res.body.phone).to.equal(exampleArtist.phone);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        let date = new Date(res.body.created).toString();
        expect(date).to.not.equal('Invalid Date');
        done();
      });
      });


    });

    describe('with no firstname', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          lastname: exampleArtist.lastname,
          username: exampleArtist.username,
          email: exampleArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with no lastname', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          firstname: exampleArtist.firstname,
          username: exampleArtist.username,
          email: exampleArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with no username', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          email: exampleArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with no email', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: exampleArtist.username,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with no city', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: exampleArtist.username,
          email: exampleArtist.email,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with no zip', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: exampleArtist.username,
          email: exampleArtist.email,
          city: exampleArtist.city,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with invalid date--string', function() {

      before(done => mockUser.call(this, done));

      it('should return an artist profile and a status 400', (done) => {

        request.post(`${url}/api/artist`)
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: exampleArtist.username,
          email: exampleArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
          created: 'striiiing',
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with an invalid body', function() {

      before(done => mockUser.call(this, done));

      it('should a status 400 bad request', (done) => {

        request.post(`${url}/api/artist`)
        .send('badbody')
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with a bad authorization header', function() {

      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', (done) => {

        request.post(`${url}/api/artist`)
        .send(exampleArtist)
        .set({
          Authorization: 'bad request',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with no authorization header', function() {

      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', (done) => {

        request.post(`${url}/api/artist`)
        .send(exampleArtist)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with bearer header with no token', function() {

      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', (done) => {

        request.post(`${url}/api/artist`)
        .send(exampleArtist)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with already-existing username', function() {

      before( done => mockArtist.call(this, done));

      it('should return a status 409', (done) => {

        request.post(`${url}/api/artist`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: this.tempArtist.username,
          email: exampleArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: this.tempArtist.phone,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });

    describe('with already-existing email', function() {

      before( done => mockArtist.call(this, done));

      it('should return a status 409', (done) => {

        request.post(`${url}/api/artist`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: exampleArtist.phone,
          email: this.tempArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: exampleArtist.phone,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });

    describe('with already-existing phone number', function() {

      before( done => mockArtist.call(this, done));

      it('should return a status 409', (done) => {

        request.post(`${url}/api/artist`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .send({
          firstname: exampleArtist.firstname,
          lastname: exampleArtist.lastname,
          username: exampleArtist.phone,
          email: exampleArtist.email,
          city: exampleArtist.city,
          zip: exampleArtist.zip,
          about: exampleArtist.about,
          phone: this.tempArtist.phone,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });

  });

  describe('testing GET to /api/artist/:artistID', () => {

    describe('with valid token and id', function(){

      before(done => mockArtist.call(this, done));

      it('should return a artist', done => {
        request.get(`${url}/api/artist/${this.tempArtist._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          console.log(res.body.firstname);
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.firstname).to.equal(this.tempArtist.firstname);
          expect(res.body.lastname).to.equal(this.tempArtist.lastname);
          expect(res.body.username).to.equal(this.tempArtist.username);
          expect(res.body.email).to.equal(this.tempArtist.email);
          expect(res.body.city).to.equal(this.tempArtist.city);
          expect(res.body.zip).to.equal(this.tempArtist.zip);
          expect(res.body.about).to.equal(this.tempArtist.about);
          expect(res.body.phone).to.equal(this.tempArtist.phone);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('with valid token and invalid id', function(){

      before(done => mockArtist.call(this, done));

      it('should status 404 not found', done => {
        request.get(`${url}/api/artist/${this.tempArtist._id}bad`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with invalid token and valid id', function(){

      before(done => mockArtist.call(this, done));

      it('should status 401 unauthorized', done => {
        request.get(`${url}/api/artist/${this.tempArtist._id}`)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with wrong user', function(){

      before(done => mockArtist.call(this, done));
      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.get(`${url}/api/artist/${this.tempArtist._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  // describe('testing GET to /api/artistname/:username', () => {
  //
  //   describe('with valid token and Username', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should return an artist', done => {
  //       request.get(`${url}/api/artistname/${this.tempArtist.username}`)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         console.log('THIS IS IT', res.body);
  //         if (err)
  //           return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.firstname).to.equal(this.tempArtist.firstname);
  //         expect(res.body.lastname).to.equal(this.tempArtist.lastname);
  //         expect(res.body.username).to.equal(this.tempArtist.username);
  //         expect(res.body.email).to.equal(this.tempArtist.email);
  //         expect(res.body.city).to.equal(this.tempArtist.city);
  //         expect(res.body.zip).to.equal(this.tempArtist.zip);
  //         expect(res.body.about).to.equal(this.tempArtist.about);
  //         expect(res.body.phone).to.equal(this.tempArtist.phone);
  //         expect(res.body.userID).to.equal(this.tempUser._id.toString());
  //         let date = new Date(res.body.created).toString();
  //         expect(date).to.not.equal('Invalid Date');
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with valid token and invalid username', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 404 not found', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist.username}bad`)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with invalid token and valid username', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist.username}`)
  //       .set({
  //         Authorization: 'Bearer ',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with wrong user', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //     before(done => mockUser.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist.username}`)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  // });

  describe('testing PUT to /api/artist/:artistID', () => {

    describe('with valid token and id', function(){

      before(done => mockArtist.call(this, done));

      it('should return a artist', done => {
        let updateData = {firstname: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.firstname).to.equal(updateData.firstname);
          expect(res.body.lastname).to.equal(this.tempArtist.lastname);
          expect(res.body.username).to.equal(this.tempArtist.username);
          expect(res.body.email).to.equal(this.tempArtist.email);
          expect(res.body.city).to.equal(this.tempArtist.city);
          expect(res.body.zip).to.equal(this.tempArtist.zip);
          expect(res.body.about).to.equal(this.tempArtist.about);
          expect(res.body.phone).to.equal(this.tempArtist.phone);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('with valid token and invalid id', function(){

      before(done => mockArtist.call(this, done));

      it('should status 404 not found', done => {
        let updateData = {firstName: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}bad`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    //TODO: Set object propery to empty so it gives me 400 errors?

    // describe('updated with empty firstname', function(){
    //
    //   before(done => mockArtist.call(this, done));
    //
    //   it('should status 400 bad request', done => {
    //     let updateData = {firstname: false};
    //     request.put(`${url}/api/artist/${this.tempArtist._id}`)
    //     .send(updateData)
    //     .set({
    //       Authorization: `Bearer ${this.tempToken}`,
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(400);
    //       done();
    //     });
    //   });
    // });

    describe('with invalid token and valid id', function(){

      before(done => mockArtist.call(this, done));

      it('should status 401 unauthorized', done => {
        let updateData = {firstName: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}`)
        .send(updateData)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with wrong user', function(){

      before(done => mockArtist.call(this, done));
      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.put(`${url}/api/artist/${this.tempArtist._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('testing DELETE to /api/artist/:artistID', () => {

    describe('with valid token and id', function(){

      before(done => mockArtist.call(this, done));

      it('should delete a artist', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('with valid token and invalid id', function(){

      before(done => mockArtist.call(this, done));

      it('should status 404 not found', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}bad`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with invalid token and valid id', function(){

      before(done => mockArtist.call(this, done));

      it('should status 401 unauthorized', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}`)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with wrong user', function(){

      before(done => mockArtist.call(this, done));
      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

});
