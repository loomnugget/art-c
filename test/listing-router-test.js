'use strict';

// bringing in test environment
require('./lib/test-env.js');
// require('./lib/aws-mock.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// app modules
const serverCtrl = require('./lib/server-control.js');
const cleanDB = require('./lib/clean-db.js');
const mockGallery = require('./lib/gallery-mock.js');
// const mockListing = require('./lib/listing-mock.js');

mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleListing = {
  title: 'a cat',
  desc: 'george does cat portraits',
  category: 'portraits',
};

describe('testing listing-router', function(){

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST /api/signup', function(){

    describe('with a valid body', function(){

      before(done => mockGallery.call(this, done));

      it('should return a listing and status 200', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          if(err) return done(err);
          console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(exampleListing.title);
          expect(res.body.desc).to.equal(exampleListing.desc);
          expect(res.body.category).to.equal(exampleListing.category);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

  });

});
