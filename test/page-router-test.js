'use strict';

// testing for page queries on all relevant models

require('./lib/test-env.js');
require('./lib/aws-mock.js');

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
const mockManyGalleries = require('./lib/populate-artist-galleries-mock.js');
//const mockManyListings = require('./lib/populate-gallery-listings-mock.js');

mongoose.Promise = Promise;

// app constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleGallery = {
  name: 'Happy Stuff',
  desc: 'this is the best album',
  category: 'fun',
};

//TESTS NEEDED
// artist has pages of galleries
// galleries have pages of listings
// listings have pages of photos
// should

describe('testing page-router', function(){
  //start/stop server and clean database
  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

 // test for page queries for many listings in a gallery with a given ID
  describe('testing /api/gallery', function() {
    describe('with pagenation' , function() {
      before(done => mockManyGalleries.call(this, 100, done));
      it('should return 50 galleries', done => {
        request.get(`${url}/api/gallery`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(50);
          done();
        });
      });
    });


    // describe('with ?page=2',  function() {
    //   // mock 100 listings
    //   before(done => mockManyListings.call(this, 100, done));
    //   it('should return a page of listings', done => {
    //     request.get(`${url}/api/gallery/${this.tempGallery._id}?page=2`)
    //     .set({ Authorization: `Bearer ${this.tempToken}`})
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       expect(res.body.name).to.equal(exampleGallery.name);
    //       expect(res.body.desc).to.equal(exampleGallery.desc);
    //       expect(res.body.userID).to.equal(this.tempUser._id.toString());
    //       expect(Array.isArray(res.body.listings)).to.equal(true);
    //       expect(res.body.pics.length).to.equal(10);
    //       let date = new Date(res.body.created).toString();
    //       expect(date).to.equal(this.tempGallery.created.toString());
    //       // iterate though listings array on gallery
    //       for (let i=0; i< res.body.listings.length; i++){
    //         //check if listings id  from the database is the same as query
    //         expect(res.body.listings[i]._id.toString()).to.equal(this.tempListings[i + 10 ]._id.toString());
    //         expect(res.body.listings[i].name).to.equal(this.tempListings[i + 10].name);
    //         expect(res.body.listings[i].desc).to.equal(this.tempListings[i + 10].desc);
    //       }
    //       done();
    //     });
    //   }); // end it block
    // });
    //
    // describe('with many listings', function(){
    //   // mock 100 listings
    //   before(done => mockManyListings.call(this, 100, done));
    //   it('should return a gallery', done => {
    //     request.get(`${url}/api/gallery/${this.tempGallery._id}`)
    //     .set({Authorization: `Bearer ${this.tempToken}`})
    //    .end((err, res) => {
    //      if (err) return done(err);
    //      expect(res.body.name).to.equal(exampleGallery.name);
    //      expect(res.body.desc).to.equal(exampleGallery.desc);
    //      expect(res.body.userID).to.equal(this.tempUser._id.toString());
    //      expect(Array.isArray(res.body.listings)).to.equal(true);
    //      expect(res.body.pics.length).to.equal(10);
    //      let date = new Date(res.body.created).toString();
    //      expect(date).to.equal(this.tempGallery.created.toString());
    //      // iterate though listings array on gallery
    //      for (let i=0; i< res.body.listings.length; i++){
    //        //check if listings id  from the database is the same as query
    //        expect(res.body.listings[i]._id.toString()).to.equal(this.tempListings[i + 10 ]._id.toString());
    //        expect(res.body.listings[i].name).to.equal(this.tempListings[i + 10].name);
    //        expect(res.body.listings[i].desc).to.equal(this.tempListings[i + 10].desc);
    //      }
    //      done();
    //    });
    //   }); // end it block
    // });

  }); // end testing /api/gallery
}); // end first describe block
