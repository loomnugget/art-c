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
const mockUser = require('./lib/gallery-mock.js');
const mockGallery = require('./lib/gallery-mock.js');
const mockListing = require('./lib/listing-mock.js');

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
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
          // console.log('res.body', res.body);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(exampleListing.title);
          expect(res.body.desc).to.equal(exampleListing.desc);
          expect(res.body.category).to.equal(exampleListing.category);
          expect(res.body.username).to.equal(this.tempUser.username);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('with no title', function() {

      before(done => mockGallery.call(this, done));

      it('should status 400 bad request', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send({
          username: this.tempGallery.username,
          desc: exampleListing.desc,
          category: exampleListing.category,
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

    describe('with no desc', function() {

      before(done => mockGallery.call(this, done));

      it('should status 400 bad request', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send({
          title: exampleListing.name,
          username: this.tempGallery.username,
          category: exampleListing.category,
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

    describe('with no category', function() {

      before(done => mockGallery.call(this, done));

      it('should return an gallery profile and a status 400', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send({
          title: exampleListing.name,
          desc: exampleListing.desc,
          username: this.tempGallery.username,
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

      before(done => mockGallery.call(this, done));

      it('should return an gallery profile and a status 400', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send({
          title: exampleListing.name,
          desc: exampleListing.desc,
          username: exampleListing.username,
          category: exampleListing.category,
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

      before(done => mockGallery.call(this, done));

      it('should a status 400 bad request', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
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

      before(done => mockGallery.call(this, done));

      it('should status 401 unauthorized', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
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

      before(done => mockGallery.call(this, done));

      it('should status 401 unauthorized', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with bearer header with no token', function() {

      before(done => mockGallery.call(this, done));

      it('should status 401 unauthorized', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

  });

  describe('testing GET to /api/listing/:listingID', () => {

    describe('with valid token and id', function(){

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        request.get(`${url}/api/listing/${this.tempListing._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(this.tempListing.title);
          expect(res.body.desc).to.equal(this.tempListing.desc);
          expect(res.body.category).to.equal(this.tempListing.category);
          expect(res.body.userID).to.equal(this.tempListing.userID.toString());
          expect(res.body.artistID).to.equal(this.tempListing.artistID.toString());
          expect(res.body.galleryID).to.equal(this.tempListing.galleryID.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });
    describe('with valid token and invalid id', function(){

      before(done => mockListing.call(this, done));

      it('should status 404 not found', done => {
        request.get(`${url}/api/listing/${this.tempListing._id}bad`)
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

      before(done => mockListing.call(this, done));

      it('should status 401 unauthorized', done => {
        request.get(`${url}/api/listing/${this.tempListing._id}`)
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

      before(done => mockListing.call(this, done));
      // before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.get(`${url}/api/listing/${this.tempListing._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

  });

});
