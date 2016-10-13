'use strict';

// testing for page queries on all relevant models

require('./lib/test-env.js');
require('./lib/aws-mocks.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

// app modules
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db');
//const mockUser = require('./lib/user-mock');
//const mockArtist = require('./lib/artist-mock');
//const mockManyGalleries = require('./lib/populate-artist-galleries-mock.js');
const mockManyListings = require('./lib/populate-gallery-listings-mock.js');


mongoose.Promise = Promise;

// app constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;


describe('testing page-router', function(){
  //start/stop server and clean database
  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

 // test for page queries for many listings in a gallery with a given ID
  describe('testing /api/gallery', function() {
    describe('with ?itemcount=10&itempage=2',  function() {
      // mock 100 listings
      before(done => mockManyListings.call(this, 100, done));
      it('should return a gallery', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}?itemcount=10&itempage=2`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleGallery.name);
          expect(res.body.desc).to.equal(exampleGallery.desc);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(Array.isArray(res.body.pics)).to.equal(true);
          expect(res.body.pics.length).to.equal(10);
          let date = new Date(res.body.created).toString();
          expect(date).to.equal(this.tempGallery.created.toString());
          for (let i=0; i< res.body.pics.length; i++){
            expect(res.body.pics[i]._id.toString()).to.equal(this.tempPics[i + 10 ]._id.toString());
            expect(res.body.pics[i].name).to.equal(this.tempPics[i + 10].name);
            expect(res.body.pics[i].desc).to.equal(this.tempPics[i + 10].desc);
            expect(res.body.pics[i].imageURI).to.equal(this.tempPics[i + 10].imageURI);
          }
          done()
        })
      })
    })
  });
});
