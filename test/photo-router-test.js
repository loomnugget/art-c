'use strict';

// /api/artist/:artistID/photo
// /api/gallery/:galleryID/photo
// /api/artist/:artistID/photo/:photoID - delete

require('./lib/test-env.js');
const awsMocks = require('./lib/aws-mock.js');

// NPM MODULES
const expect = require('chai').expect;
const request = require('superagent');

// APP MODULES
const artistMock = require('./lib/artist-mock.js');
const cleanDB = require('./lib/clean-db.js');
const serverControl = require('./lib/server-control.js');

// APP MODULES
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const examplePhoto = {
  name: 'going hard at the club',
  alt: 'good times',
  image: `${__dirname}/data/dog.jpg`,
};

describe('testing pic router', function() {

  //start server before tests
  before(done => serverControl.serverUp(server, done));
  //stop server after tests
  after(done => serverControl.serverDown(server, done));
  //clean database after each test
  afterEach(done => cleanDB(done));

  describe('/api/artist/:artistID/photo', function() {
    describe('with valid token and data', function() {

      before(done => artistMock.call(this, done));

      it ('should return a photo', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .attach('image', examplePhoto.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.alt).to.equal(examplePhoto.alt);
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
          expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      }); // end it block
    });
  }); //end /api/artist/:artistID/photo

  describe('/api/gallery/:galleryID/photo', function() {
    describe('with valid token and data', function() {

      before(done => artistMock.call(this, done));

      it ('should return a photo', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .attach('image', examplePhoto.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.alt).to.equal(examplePhoto.alt);
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
          expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      }); // end it block
    });
  }); //end /api/gallery/:galleryID/photo

  describe('/api/listing/:listingID/photo', function() {
    describe('with valid token and data', function() {

      before(done => artistMock.call(this, done));

      it ('should return a photo', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .attach('image', examplePhoto.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.alt).to.equal(examplePhoto.alt);
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
          expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      }); // end it block
    });
  }); //end /api/listing/:listingID/photo 



}); //end first describe block

// mocking data
