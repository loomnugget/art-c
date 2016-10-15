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
const mockManyListings = require('./lib/populate-gallery-listings-mock.js');

mongoose.Promise = Promise;

// app constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

// const exampleGallery = {
//   name: 'Happy Stuff',
//   desc: 'this is the best album',
//   category: 'fun',
// };

//TESTS NEEDED

describe('testing page-router', function(){
  //start/stop server and clean database
  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));


  describe('testing /api/listing', function() {
    describe('with pagenation' , function() {
      before(done => mockManyListings.call(this, 100, done));
      it('should return 50 listings', done => {
        request.get(`${url}/api/listing`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(50);
          done();
        });
      });
    });

    describe('with /api/listing?page=5' , function() {
      before(done => mockManyListings.call(this, 100, done));
      it('should return 50 listings', done => {
        request.get(`${url}/api/listing?page=5`)
        .end((err, res) => {
          if (err) return done(err);
          for (let i=0; i< res.body.length; i++){
            expect(res.body.listings[i]._id.toString()).to.equal(this.tempListings[i + 10 ]._id.toString());
            expect(res.body.listings[i].artistID.toString()).to.equal(this.tempListings[i + 10 ].artistID.toString());
            expect(res.body.listings[i].galleryID.toString()).to.equal(this.tempListings[i + 10 ].galleryID.toString());
            expect(res.body.listings[i].category).to.equal(this.tempListings[i + 10].category);
            expect(res.body.listings[i].name).to.equal(this.tempListings[i + 10].name);
            expect(res.body.listings[i].desc).to.equal(this.tempListings[i + 10].desc);
          }
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  }); //end testing listing pagenation

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

    describe('with /api/gallery?page=5' , function() {
      before(done => mockManyGalleries.call(this, 100, done));
      it('should return 50 listings', done => {
        request.get(`${url}/api/gallery?page=5`)
        .end((err, res) => {
          if (err) return done(err);
          for (let i=0; i< res.body.length; i++){
            expect(res.body.galleries[i]._id.toString()).to.equal(this.tempGalleries[i + 10 ]._id.toString());
            expect(res.body.galleries[i].artistID.toString()).to.equal(this.tempGalleries[i + 10 ].artistID.toString());
            expect(res.body.galleries[i].category).to.equal(this.tempGalleries[i + 10].category);
            expect(res.body.galleries[i].desc).to.equal(this.tempGalleries[i + 10].desc);
          }
          expect(res.status).to.equal(200);
          done();
        });
      });
    });


  }); // end testing /api/gallery
}); // end first describe block
