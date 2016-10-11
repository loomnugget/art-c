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
const serverCtrl = require('./lib/server-control.js');
const cleanDB = require('./lib/clean-db.js');
// const mockGallery = require('./lib/gallery-mock.js');
// const mockListing = require('./lib/listing-mock.js');

mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleListing = {
  title: 'Such Cool Art',
  desc: 'I made it, you wanna buy it',
  category: 'cool',
};

describe('testing listing-router', function(){

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST /api/signup', function(){

    describe('with a valid body', function(){
      it('should return a token', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}/listing`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send(exampleListing)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(exampleListing.title);
          expect(res.body.desc).to.equal(exampleListing.desc);
          expect(res.body.category).to.equal(exampleListing.category);
          expect(res.body.artistID).to.equal(this.tempArtist._id);
          expect(res.body.galleryID).to.equal(this.tempGallery);
          done();
        });
      });
    });

  });

});
