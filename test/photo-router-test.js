'use strict';

// /api/artist/:artistID/photo
// /api/gallery/:galleryID/photo
// /api/artist/:artistID/photo/:photoID - delete

require('./lib/test-env.js');
//const awsMocks = require('./lib/aws-mocks.js');

// NPM MODULES
const expect = require('chai').expect;
const request = require('superagent');

// APP MODULES
//const photoMock = require('./lib/photo-mock.js');
const cleanDB = require('./lib/clean-db.js');
const serverControl = require('./lib/server-control.js');

// APP MODULES
const server = require('../server.js');
const url = 'http://localhost:3000';

const examplePhoto = {
  name: 'going hard at the club',
  alt: 'good times',
  image: `${__dirname}/data/dog.jpg`,
};

describe('testing pic router', function() {

  //start server before tests
  before( done => serverControl.serverUp(server, done));
  //stop server after tests
  after(done => serverControl.serverDown(server, done));
  //clean database after each test
  afterEach(done => cleanDB(done));

  describe('/api/artist/:artistID/photo', function() {
    describe('with valid token and data', function() {

      it ('should return a pic', done => {
        request.post(`${url}/api/artist/:artistID/photo`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .field('name', examplePhoto.name)
        .field('alt', examplePhoto.alt)
        .attach('image', examplePhoto.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(examplePhoto.name);
          expect(res.body.alt).to.equal(examplePhoto.alt);
 //         expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
  //        expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
          done();
        });
      }); // end it block
    });
  }); // end testing POST
}); //end first describe block

// mocking data
//before(done => photoMock.call(this, done));
