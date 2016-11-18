'use strict';

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
const mockMultipleArtists = require('./lib/mock-multiple-artists.js');
const mockManyGalleries = require('./lib/populate-artist-galleries-mock.js');
const mockManyListings = require('./lib/populate-gallery-listings-mock.js');

mongoose.Promise = Promise;

// app constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

describe('testing page-router', function(){
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
  });

  describe('testing /api/gallery', function() {
    describe('with pagenation' , function() {
      before(done => mockManyGalleries.call(this, 100, done));
      it('should return 50 galleries', done => {
        request.get(`${url}/api/gallery`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(100);
          done();
        });
      });
    });
  });

  describe('testing GET to /api/artist', () => {

    describe('with valid token and id', () => {

      before(done => mockMultipleArtists.call(this, done));

      it('should status 200 and return artists', done => {
        request.get(`${url}/api/artist`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          console.log(res.body);
          if(err) return done(err);
          expect(res.status).to.equal(200);
          // expect(res.body.length).to.equal(10);
          done();
        });
      });
    });
  });

});
