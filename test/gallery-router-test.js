'use strict';

// bringing in test environment
require('./lib/test-env.js');

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');

// app modules
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db');
const mockUser = require('./lib/user-mocks');
const mockArtist = require('./lib/artist-mock');
// const mockGallery = require('./lib/gallery-mock');

mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleGallery = {
  name: 'Happy Stuff',
  username: 'stuff',
  desc: 'this is the best album',
  category: 'fun',
};

// describe('testing gallery-router', function() {
//
//   before( done => serverCtrl.serverUp(server, done));
//
//   after( done => serverCtrl.serverDown(server, done));
//
//   afterEach( done => cleanDB(done));
//
//   describe('testing POST /api/gallery', function() {
//
//     describe('with a valid body', function() {
//
//       // before(done => mockUser.call(this, done));
//       before(done => mockArtist.call(this, done));
//
//       it('should return a gallery profile and a status 200', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send(exampleGallery)
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body.name).to.equal(exampleGallery.name);
//         expect(res.body.desc).to.equal(exampleGallery.desc);
//         expect(res.body.category).to.equal(exampleGallery.category);
//         expect(res.body.userID).to.equal(this.tempUser._id.toString());
//         expect(res.body.artestID).to.equal(this.tempArtist._id);
//         let date = new Date(res.body.created).toString();
//         expect(date).to.not.equal('Invalid Date');
//         done();
//       });
//       });
//
//
//     });
//
//     describe('with no name', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should status 400 bad request', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send({
//           username: exampleGallery.username,
//           desc: exampleGallery.desc,
//           category: exampleGallery.category,
//         })
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('with no desc', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should status 400 bad request', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send({
//           name: exampleGallery.name,
//           username: exampleGallery.username,
//           category: exampleGallery.category,
//         })
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('with no username', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should status 400 bad request', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send({
//           name: exampleGallery.name,
//           desc: exampleGallery.desc,
//           category: exampleGallery.category,
//         })
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('with no category', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should return an gallery profile and a status 400', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send({
//           name: exampleGallery.name,
//           desc: exampleGallery.desc,
//           username: exampleGallery.username,
//         })
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('with invalid date--string', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should return an gallery profile and a status 400', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send({
//           name: exampleGallery.name,
//           desc: exampleGallery.desc,
//           username: exampleGallery.username,
//           category: exampleGallery.category,
//           created: 'striiiing',
//         })
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('with an invalid body', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should a status 400 bad request', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send('badbody')
//         .set({
//           Authorization: `Bearer ${this.tempToken}`,
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('with a bad authorization header', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should status 401 unauthorized', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send(exampleGallery)
//         .set({
//           Authorization: 'bad request',
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           done();
//         });
//       });
//     });
//
//     describe('with no authorization header', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should status 401 unauthorized', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send(exampleGallery)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           done();
//         });
//       });
//     });
//
//     describe('with bearer header with no token', function() {
//
//       before(done => mockUser.call(this, done));
//
//       it('should status 401 unauthorized', (done) => {
//
//         request.post(`${url}/api/gallery`)
//         .send(exampleGallery)
//         .set({
//           Authorization: 'Bearer ',
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           done();
//         });
//       });
//     });
//   });
  //
  // describe('testing GET to /api/artist/:artistID', () => {
  //
  //   describe('with valid token and id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should return a artist', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist._id}`)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         console.log(res.body.firstname);
  //         if (err)
  //           return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.firstname).to.equal(this.tempArtist.firstname);
  //         expect(res.body.lastname).to.equal(this.tempArtist.lastname);
  //         expect(res.body.username).to.equal(this.tempArtist.username);
  //         expect(res.body.email).to.equal(this.tempArtist.email);
  //         expect(res.body.city).to.equal(this.tempArtist.city);
  //         expect(res.body.zip).to.equal(this.tempArtist.zip);
  //         expect(res.body.about).to.equal(this.tempArtist.about);
  //         expect(res.body.phone).to.equal(this.tempArtist.phone);
  //         expect(res.body.userID).to.equal(this.tempUser._id.toString());
  //         let date = new Date(res.body.created).toString();
  //         expect(date).to.not.equal('Invalid Date');
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with valid token and invalid id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 404 not found', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist._id}bad`)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with invalid token and valid id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist._id}`)
  //       .set({
  //         Authorization: 'Bearer ',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with wrong user', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //     before(done => mockUser.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.get(`${url}/api/artist/${this.tempArtist._id}`)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  // });
  //
  // describe('testing PUT to /api/artist/:artistID', () => {
  //
  //   describe('with valid token and id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should return a artist', done => {
  //       let updateData = {firstname: 'bob'};
  //       request.put(`${url}/api/artist/${this.tempArtist._id}`)
  //       .send(updateData)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         if (err)
  //           return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.firstname).to.equal(updateData.firstname);
  //         expect(res.body.lastname).to.equal(this.tempArtist.lastname);
  //         expect(res.body.username).to.equal(this.tempArtist.username);
  //         expect(res.body.email).to.equal(this.tempArtist.email);
  //         expect(res.body.city).to.equal(this.tempArtist.city);
  //         expect(res.body.zip).to.equal(this.tempArtist.zip);
  //         expect(res.body.about).to.equal(this.tempArtist.about);
  //         expect(res.body.phone).to.equal(this.tempArtist.phone);
  //         expect(res.body.userID).to.equal(this.tempUser._id.toString());
  //         let date = new Date(res.body.created).toString();
  //         expect(date).to.not.equal('Invalid Date');
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with valid token and invalid id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 404 not found', done => {
  //       let updateData = {firstName: 'bob'};
  //       request.put(`${url}/api/artist/${this.tempArtist._id}bad`)
  //       .send(updateData)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with invalid token and valid id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       let updateData = {firstName: 'bob'};
  //       request.put(`${url}/api/artist/${this.tempArtist._id}`)
  //       .send(updateData)
  //       .set({
  //         Authorization: 'Bearer ',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with wrong user', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //     before(done => mockUser.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.put(`${url}/api/artist/${this.tempArtist._id}`)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  // });
  //
  // describe('testing DELETE to /api/artist/:artistID', () => {
  //
  //   describe('with valid token and id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should delete a artist', done => {
  //       request.delete(`${url}/api/artist/${this.tempArtist._id}`)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         if (err)
  //           return done(err);
  //         expect(res.status).to.equal(204);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with valid token and invalid id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 404 not found', done => {
  //       request.delete(`${url}/api/artist/${this.tempArtist._id}bad`)
  //       .set({
  //         Authorization: `Bearer ${this.tempToken}`,
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with invalid token and valid id', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.delete(`${url}/api/artist/${this.tempArtist._id}`)
  //       .set({
  //         Authorization: 'Bearer ',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  //
  //   describe('with wrong user', function(){
  //
  //     before(done => mockArtist.call(this, done));
  //     before(done => mockUser.call(this, done));
  //
  //     it('should status 401 unauthorized', done => {
  //       request.delete(`${url}/api/artist/${this.tempArtist._id}`)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  // });

});
