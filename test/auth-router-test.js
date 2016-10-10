'use strict';

// bringing in test environment
require('./lib/test-env.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// app modules
const serverCtrl = require('./lib/server-control.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/user-mocks.js');

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
    //TODO: More tests for POST here.

  });
});
