'use strict';

require('./lib/test-env.js');
const awsMocks = require('./lib/aws-mock.js');

// NPM MODULES
const expect = require('chai').expect;
const request = require('superagent');

// APP MODULES
const artistMock = require('./lib/artist-mock.js');
const photoMock = require('./lib/photo-mock.js');
const cleanDB = require('./lib/clean-db.js');
const serverControl = require('./lib/server-control.js');

// APP MODULES
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const examplePhoto = {
  name: 'goose',
  alt: 'good times',
  image: `${__dirname}/data/dog.jpg`,
};

describe('testing photo router', function() {

  //start server before tests
  before(done => serverControl.serverUp(server, done));
  //stop server after tests
  after(done => serverControl.serverDown(server, done));
  //clean database after each test
  afterEach(done => cleanDB(done));

  describe('testing POST routes - /api/artist/:artistID/photo', function() {
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
          expect(res.body.name).to.equal(examplePhoto.name);
          expect(res.body.alt).to.equal(examplePhoto.alt);
          expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
          expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      }); // end it block
    });

    // describe('with no name', function() {
    //
    //   before(done => artistMock.call(this, done));
    //
    //   it('should respond with status 400', done => {
    //     request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
    //     .set({Authorization: `Bearer ${this.tempToken}`})
    //     .field('alt', examplePhoto.alt)
    //     .attach('image', examplePhoto.image)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(400);
    //       done();
    //     });
    //   });
    //
    // });

    describe('with no image', function() {
      before(done => artistMock.call(this, done));

      it('should respond with status 400', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with an invalid token', function() {
      before(done => artistMock.call(this, done));

      it('should respond with status 401', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
        .set({Authorization:' Bearer '})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .attach('image', examplePhoto.image)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with an invalid artistID', function() {
      before(done => artistMock.call(this, done));

      it('should respond with status 404', done => {
        request.post(`${url}/api/artist/${this.tempArtist._id}goose/photo`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .attach('image', examplePhoto.image)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  }); //end /api/artist/:artistID/photo - POST

  describe('testing DELETE routes - /api/artist/:artistID/photo/:photoID', function() {
    describe('with valid token and data', function() {
      before(done => photoMock.call(this, done));
      it ('should return a photo', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}/photo/${this.tempPhoto._id}`)
        .set({Authorization: `Bearer: ${this.tempToken}`})
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      }); // end it block
    }); //end 'with valid token'
  });
  //
  // describe('/api/gallery/:galleryID/photo', function() {
  //   describe('with valid token and data', function() {
  //
  //     before(done => artistMock.call(this, done));
  //
  //     it ('should return a photo', done => {
  //       request.post(`${url}/api/gallery/${this.tempGallery._id}/photo`)
  //       .set({Authorization: `Bearer ${this.tempToken}`})
  //       .field('name', examplePhoto.name)
  //       .field('alt', examplePhoto.alt)
  //       .attach('image', examplePhoto.image)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.name).to.equal(examplePhoto.name);
  //         expect(res.body.alt).to.equal(examplePhoto.alt);
  //         expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
  //         expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
  //         done();
  //       });
  //     }); // end it block
  //   });
  // }); //end /api/gallery/:galleryID/photo
  //
  // describe('/api/listing/:listingID/photo', function() {
  //   describe('with valid token and data', function() {
  //
  //     before(done => artistMock.call(this, done));
  //
  //     it ('should return a photo', done => {
  //       request.post(`${url}/api/artist/${this.tempArtist._id}/photo`)
  //       .set({Authorization: `Bearer ${this.tempToken}`})
  //       .field('name', examplePhoto.name)
  //       .field('alt', examplePhoto.alt)
  //       .attach('image', examplePhoto.image)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.name).to.equal(examplePhoto.name);
  //         expect(res.body.alt).to.equal(examplePhoto.alt);
  //         expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
  //         expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
  //         done();
  //       });
  //     }); // end it block
  //   });
  // }); //end /api/listing/:listingID/photo



}); //end first describe block

// mocking data
