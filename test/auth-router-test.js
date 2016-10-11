'use strict';

// bringing in test environment
require('./lib/test-env.js');
require('./lib/aws-mock.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// app modules
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/user-mock.js');

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

  describe('testing GET /api/signup', function() {

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

      it('should return a status 401, bad request', (done) => {
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

      it('should return a status 401, bad request', (done) => {
        request.get(`${url}/api/login`)
        .auth(this.tempUser.username, 'baddpassword')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.text).to.equal('UnauthorizedError');
          done();
        });
      });
    });
  });
});
