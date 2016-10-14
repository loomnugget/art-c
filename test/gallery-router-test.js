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
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db');
const mockManyPhotos = require('./lib/mock-many-photos');
const mockArtist = require('./lib/artist-mock');
const mockGallery = require('./lib/gallery-mock');
const mockUser = require('./lib/user-mock');
const mockMultipleListings = require('./lib/populate-gallery-listings-mock.js');


mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleGallery = {
  name: 'Happy Stuff',
  desc: 'this is the best album',
  category: 'fun',
};

describe('testing gallery-router', function() {

  before( done => serverCtrl.serverUp(server, done));

  after( done => serverCtrl.serverDown(server, done));

  afterEach( done => cleanDB(done));

  describe('testing POST /api/artist/:artistID/gallery', () => {

    describe('with a valid body', () => {

      before(done => mockArtist.call(this, done));

      it('should return a gallery profile and a status 200', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send(exampleGallery)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempArtist.username);
          expect(res.body.name).to.equal(exampleGallery.name);
          expect(res.body.desc).to.equal(exampleGallery.desc);
          expect(res.body.category).to.equal(exampleGallery.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('with a bad user token', () => {

      before(done => mockArtist.call(this, done));

      it('should return a 401 error unauthorized user', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send(exampleGallery)
        .set({
          Authorization: `Bearer ${this.tempToken}bad`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with bad/invalid artist id', () => {

      before(done => mockArtist.call(this, done));

      it('should return status 404 for invalid id', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}bad/gallery`)
        .send({
          name: exampleGallery.name,
          username: this.tempArtist.username,
          desc: exampleGallery.desc,
          category: exampleGallery.category,
        })
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with no name', () => {

      before(done => mockArtist.call(this, done));

      it('should return status 400 bad request', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send({
          username: this.tempArtist.username,
          desc: exampleGallery.desc,
          category: exampleGallery.category,
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

    describe('with no desc', () => {

      before(done => mockArtist.call(this, done));

      it('should status 400 bad request', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send({
          name: exampleGallery.name,
          username: this.tempArtist.username,
          category: exampleGallery.category,
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

    describe('with no category', () => {

      before(done => mockArtist.call(this, done));

      it('should return an gallery profile and a status 400', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send({
          name: exampleGallery.name,
          desc: exampleGallery.desc,
          username: this.tempArtist.username,
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

    describe('with invalid date--string', () => {

      before(done => mockArtist.call(this, done));

      it('should return an gallery profile and a status 400', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send({
          name: exampleGallery.name,
          desc: exampleGallery.desc,
          username: exampleGallery.username,
          category: exampleGallery.category,
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

    describe('with an invalid body', () => {

      before(done => mockArtist.call(this, done));

      it('should a status 400 bad request', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
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

    describe('with a bad authorization header', () => {

      before(done => mockArtist.call(this, done));

      it('should return status 400 bad request', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send(exampleGallery)
        .set({
          Authorization: 'bad request',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with no authorization header', () => {

      before(done => mockArtist.call(this, done));

      it('should return status 400 bad request', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send(exampleGallery)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with bearer header with no token', () => {

      before(done => mockArtist.call(this, done));

      it('should return status 400 bad request', (done) => {

        request.post(`${url}/api/artist/${this.tempArtist._id}/gallery`)
        .send(exampleGallery)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing GET to /api/gallery/:galleryID', () => {

    describe('with valid token and id', () =>{

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(this.tempGallery.name);
          expect(res.body.desc).to.equal(this.tempGallery.desc);
          expect(res.body.category).to.equal(this.tempGallery.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('testing populate gallery listings', () => {

      before(done => mockMultipleListings.call(this, 10, done));

      it('should return a gallery with populated listing array', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.listings.length).to.equal(10);
          done();
        });
      });
    });

    describe('testing populate gallery listings with valid id and bad token request', function(){

      before(done => mockMultipleListings.call(this, 10, done));

      it('should return a 400 error bad request', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('testing populate gallery listings with invalid id and valid token', function(){

      before(done => mockMultipleListings.call(this, 10, done));

      it('should return a 404 error for invalid id', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}bad`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with valid token and invalid id', () => {

      before(done => mockGallery.call(this, done));

      it('should return status 404 not found', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}bad`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with bad token request and valid id', () => {

      before(done => mockGallery.call(this, done));

      it('should return status 400 bad request', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing PUT to /api/gallery/:galleryID', () => {

    describe('updating name property with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {name: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(updateData.name);
          expect(res.body.desc).to.equal(this.tempGallery.desc);
          expect(res.body.category).to.equal(this.tempGallery.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating desc property with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {desc: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(this.tempGallery.name);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(this.tempGallery.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating category property with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {category: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(this.tempGallery.name);
          expect(res.body.desc).to.equal(this.tempGallery.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating name and category properties with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {name: 'bob', category: 'bob2'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(updateData.name);
          expect(res.body.desc).to.equal(this.tempGallery.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating name and desc properties with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {name: 'bob', desc: 'bob2'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(updateData.name);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(this.tempGallery.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating desc and category properties with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {desc: 'bob', category: 'bob2'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(this.tempGallery.name);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating name, desc and category properties with valid token and id, ', () => {

      before(done => mockGallery.call(this, done));

      it('should return a gallery', done => {
        let updateData = {name: 'bob', desc: 'bob2', category: 'bob3'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.name).to.equal(updateData.name);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('with valid token and invalid id', () => {

      before(done => mockGallery.call(this, done));

      it('should status 404 not found', done => {
        let updateData = {name: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}bad`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with bad token request and valid id', () => {

      before(done => mockGallery.call(this, done));

      it('should return status 400 bad request', done => {
        let updateData = {name: 'bob'};
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .send(updateData)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with wrong user', () => {

      before(done => mockGallery.call(this, done));
      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('updated with empty name', () => {

    before(done => mockGallery.call(this, done));

    it('should status 400 bad request', done => {
      let updateData = {name: ''};
      request.put(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
      .send(updateData)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing DELETE to /api/artist/:artistID/gallery/:galleryID', () => {

    describe('with valid token and id', () => {

      before(done => mockGallery.call(this, done));
      it('should delete a gallery', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('with valid token and invalid id', () => {

      before(done => mockGallery.call(this, done));

      it('should status 404 not found', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}bad`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with bad token request and valid id', () => {

      before(done => mockGallery.call(this, done));

      it('should status 400 bad request', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: 'Bearer ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with wrong user', () => {

      before(done => mockGallery.call(this, done));
      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with valid token and id', () => {

      before( done => mockManyPhotos.call(this, 5, done));

      it('should delete a gallery and all associated listings and photos', done => {
        request.delete(`${url}/api/artist/${this.tempArtist._id}/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
  });
});
