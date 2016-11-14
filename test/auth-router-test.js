'use strict';

require('./lib/test-env.js');
require('./lib/aws-mock.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const validator = require('validator');

// app modules
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/user-mock.js');
const mockManyPhotos = require('./lib/mock-many-photos.js');

mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'fakeuser',
  password: '192837465',
  email: 'fake@fakestuff.fake',
};

describe('testing auth-router', function() {

  before( done => serverCtrl.serverUp(server, done));

  after( done => serverCtrl.serverDown(server, done));

  afterEach( done => cleanDB(done));

  describe('testing POST /api/signup', function() {

    describe('with a valid body', function() {

      it('should return a token', (done) => {

        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.text).to.equal(true);
          expect(validator.isEmail(exampleUser.email)).to.equal(true);
          done();
        });
      });
    });

    describe('with no username', function() {

      it('should return a status 400, bad request', (done) => {

        request.post(`${url}/api/signup`)
        .send({
          password: exampleUser.password,
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with no password', function() {

      it('should return a status 400, bad request', (done) => {

        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with no email', function() {

      it('should return a status 400, bad request', (done) => {

        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: exampleUser.password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });

    describe('with duplicate username', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 409', (done) => {

        request.post(`${url}/api/signup`)
        .send({
          username: this.tempUser.username,
          password: exampleUser.password,
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });

    describe('with duplicate email', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 409', (done) => {

        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: exampleUser.password,
          email: this.tempUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.text).to.equal('ConflictError');
          done();
        });
      });
    });

    describe('with password < 7 characters', function() {

      it('should return a status 400', (done) => {

        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: 'dog',
          email: exampleUser.email,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('BadRequestError');
          done();
        });
      });
    });
  });

  describe('testing GET /api/login', function() {

    describe('with valid authorization', function() {

      before( done => mockUser.call(this, done));

      it('should return a token', (done) => {
        request.get(`${url}/api/login`)
        .auth(this.tempUser.username, this.tempPassword)
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.text).to.equal(true);
          done();
        });
      });
    });

    describe('with a bad username', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 401, unauthorized', (done) => {
        request.get(`${url}/api/login`)
        .auth('notgood', this.tempPassword)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });

    describe('with a bad password', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 401, unauthorized', (done) => {
        request.get(`${url}/api/login`)
        .auth(this.tempUser.username, 'badpassword')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });
  });

  describe('testing PUT /api/user/updateEmail', function() {

    describe('with valid token', function() {

      before( done => mockUser.call(this, done));

      it('should return a user with a new email', done => {
        let updateData = {email: 'bob@bob.bob'};
        request.put(`${url}/api/user/updateEmail`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.email).to.equal(updateData.email);
          done();
        });
      });
    });

    describe('with invalid token', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 400', done => {
        let updateData = {email: 'bob@bob.bob'};
        request.put(`${url}/api/user/updateEmail`)
        .send(updateData)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with wrong token', function() {
      let tempSecondUser = {};
      before( done => mockUser.call(this, done));
      before( done => mockUser.call(tempSecondUser, done));

      it('should return a user with a new email', done => {
        let updateData = {email: 'bob@bob.bob'};
        request.put(`${url}/api/user/updateEmail`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempUser.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('testing PUT /api/user/updateUsername', function() {

    describe('with valid token and id', function() {

      before( done => mockUser.call(this, done));

      it('should return a user with a new username', done => {
        let updateData = {username: 'bobbob'};
        request.put(`${url}/api/user/updateUsername`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(updateData.username);
          done();
        });
      });
    });

    describe('with wrong token', function() {

      let tempSecondUser = {};
      before( done => mockUser.call(this, done));
      before( done => mockUser.call(tempSecondUser, done));

      it('should return a status 404', done => {
        let updateData = {username: 'bob'};
        request.put(`${url}/api/user/updateUsername`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempUser.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with invalid token', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 400', done => {
        let updateData = {username: 'bob'};
        request.put(`${url}/api/user/updateUsername`)
        .send(updateData)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing PUT /api/user/updatePassword', function() {

    describe('with valid token', function() {

      before( done => mockUser.call(this, done));

      it('should return a user with a new email', done => {
        let updateData = {password: 'password'};
        request.put(`${url}/api/user/updatePassword`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.password).to.equal(updateData.password);
          done();
        });
      });
    });

    describe('with invalid token', function() {

      before( done => mockUser.call(this, done));

      it('should return a status 400', done => {
        let updateData = {password: 'password'};
        request.put(`${url}/api/user/updatePassword`)
        .send(updateData)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with wrong token', function() {
      let tempSecondUser = {};
      before( done => mockUser.call(this, done));
      before( done => mockUser.call(tempSecondUser, done));

      it('should return a user with a new password', done => {
        let updateData = {password: 'password'};
        request.put(`${url}/api/user/updatePassword`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempUser.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('testing DELETE to /api/artist/:artistID', () => {

      describe('with valid token', () => {

        before( done => mockManyPhotos.call(this, 5, done));

        it('should delete an artist and all associated galleries, listings and photos', done => {
          request.delete(`${url}/api/user/deleteAccount`)
          .set({
            Authorization: `Bearer ${this.tempToken}`,
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(204);
            done();
          });
        });
      });

      describe('with valid token only ONLY user account w/ no gall, list, etc.', () => {

        before(done => mockUser.call(this, done));

        it('should delete an artist and all associated galleries, listings and photos', done => {
          request.delete(`${url}/api/user/deleteAccount`)
          .set({
            Authorization: `Bearer ${this.tempToken}`,
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(204);
            done();
          });
        });
      });

      describe('with bad token request.', () => {

        before(done => mockUser.call(this, done));

        it('should delete an artist and all associated galleries, listings and photos', done => {
          request.delete(`${url}/api/user/deleteAccount`)
          .set({
            Authorization: 'Bearer ',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
        });
      });

      describe('with wrong token and many photos', function() {
        let tempSecondUser = {};
        before( done => mockManyPhotos.call(this, 5, done));
        before(done => mockUser.call(tempSecondUser, done));

        it('should return status 401 unauthorized', done => {
          request.delete(`${url}/api/user/deleteAccount`)
          .set({
            Authorization: `Bearer ${this.tempUser.tempToken}`,
          })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
        });
      });

      describe('with bad token and many photos', function() {
        before( done => mockManyPhotos.call(this, 5, done));

        it('should return status 401 unauthorized', done => {
          request.delete(`${url}/api/user/deleteAccount`)
          .set({
            Authorization: `Bearer ${this.tempUser.tempToken}`,
          })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
        });
      });
    });
  });
});
