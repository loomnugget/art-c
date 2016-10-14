'use strict';

require('./lib/test-env.js');
require('./lib/aws-mock.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// app modules
const serverCtrl = require('./lib/server-control.js');
const cleanDB = require('./lib/clean-db.js');
const mockGallery = require('./lib/gallery-mock.js');
const mockListing = require('./lib/listing-mock.js');
const mockUser = require('./lib/user-mock.js');
const mockManyPhotos = require('./lib/mock-many-photos.js');

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

  describe('testing POST /api/signup', () => {

    describe('with a valid body', () =>{

      before(done => mockGallery.call(this, done));

      it('should return a listing and status 200', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if(err) return done(err);
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

    describe('with no title', () => {

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

    describe('with no desc', () => {

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

    describe('with no category', () => {

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

    describe('with invalid date--string', () => {

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

    describe('with an invalid body', () => {

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

    describe('with a bad authorization header', () => {

      before(done => mockGallery.call(this, done));

      it('should return status 400 bad request', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
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

      before(done => mockGallery.call(this, done));

      it('should status 400 bad request', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with bearer header with no token', () => {

      before(done => mockGallery.call(this, done));

      it('should return status 400 bad request', (done) => {

        request.post(`${url}/api/gallery/${this.tempGallery._id}/listing`)
        .send(exampleListing)
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

  describe('testing GET to /api/listing/:listingID', () => {

    describe('with valid token and id', () => {

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
    describe('with valid token and invalid id', () => {

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

    describe('with bearer header with no token', () => {

      before(done => mockListing.call(this, done));

      it('should return status 400 bad request', done => {
        request.get(`${url}/api/listing/${this.tempListing._id}`)
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

  describe('testing PUT to /api/listing/:listingID', () => {

    describe('updating title property with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {title: 'bob'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(updateData.title);
          expect(res.body.desc).to.equal(this.tempListing.desc);
          expect(res.body.category).to.equal(this.tempListing.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating desc property with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {desc: 'bob'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(this.tempListing.title);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(this.tempListing.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating category property with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {category: 'bob'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(this.tempListing.title);
          expect(res.body.desc).to.equal(this.tempListing.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating title and category properties with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {title: 'bob', category: 'bob2'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(updateData.title);
          expect(res.body.desc).to.equal(this.tempListing.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating title and desc properties with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {title: 'bob', desc: 'bob2'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(updateData.title);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(this.tempListing.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating desc and category properties with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {desc: 'bob', category: 'bob2'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempListing.username);
          expect(res.body.title).to.equal(this.tempListing.title);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('updating title, desc and category properties with valid token and id, ', () => {

      before(done => mockListing.call(this, done));

      it('should return a listing', done => {
        let updateData = {title: 'bob', desc: 'bob2', category: 'bob3'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .send(updateData)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          if (err)
            return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(this.tempGallery.username);
          expect(res.body.title).to.equal(updateData.title);
          expect(res.body.desc).to.equal(updateData.desc);
          expect(res.body.category).to.equal(updateData.category);
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.artistID).to.equal(this.tempArtist._id.toString());
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          let date = new Date(res.body.created).toString();
          expect(date).to.not.equal('Invalid Date');
          done();
        });
      });
    });

    describe('with valid token and invalid id', () => {

      before(done => mockListing.call(this, done));

      it('should status 404 not found', done => {
        let updateData = {name: 'bob'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}bad`)
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

    describe('with bearer header and no token', () => {

      before(done => mockListing.call(this, done));

      it('should return status 400 bad request', done => {
        let updateData = {title: 'bob'};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
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

      before(done => mockListing.call(this, done));
      before(done => mockUser.call(this, done));

      it('should status 401 unauthorized', done => {
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('updated with empty name', function(){

      before(done => mockListing.call(this, done));

      it('should status 400 bad request', done => {
        let updateData = {title: ''};
        request.put(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
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
  });

  describe('testing DELETE to /api/listing/:listingID', () => {

    describe('with valid token and id', () => {

      before(done => mockListing.call(this, done));

      it('should delete a listing', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
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

      before(done => mockListing.call(this, done));

      it('should status 404 not found', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}bad`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with bearer header and no token', () => {

      before(done => mockListing.call(this, done));

      it('should return status 400 bad request', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
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

      before(done => mockListing.call(this, done));
      before(done => mockUser.call(this, done));

      it('should return status 401 unauthorized', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
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

      it('should delete a listing and all associated photos and references', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/listing/${this.tempListing._id}`)
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
