// 'use strict';
//
// // /api/artist/:artistID/photo
// // /api/gallery/:galleryID/photo
// // /api/artist/:artistID/photo/:photoID - delete
//
// require('./lib/test-env.js');
// //const awsMocks = require('./lib/aws-mocks.js');
//
// // NPM MODULES
// const expect = require('chai').expect;
// const request = require('superagent');
//
// // APP MODULES
// //const photoMock = require('./lib/photo-mock.js');
// const cleanDB = require('./lib/clean-db.js');
// //const galleryMock = require('./lib/gallery-mock.js');
// const serverControl = require('./lib/server-control.js');
//
// // APP MODULES
// const server = require('../server.js');
// const url = 'http://localhost:3000';
//
// const examplePhoto = {
//   name: 'going hard at the club',
//   alt: 'good times',
//   image: `${__dirname}/data/sheild.png`,
// };
//
// describe('testing pic router', function() {
//
//   before( done => serverControl.serverUp(server, done));
//   after(done => serverControl.serverDown(server, done));
//   afterEach(done => cleanDB(done));
//
//   describe('testing POST /api/gallery/:id/pic', function() {
//     describe('with valid token and data', function() {
//       // mocking data
//       before(done => galleryMock.call(this, done));
//
//       it ('should return a pic', done => {
//         request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .field('name', examplePhoto.name)
//         .field('desc', examplePhoto.desc)
//         .attach('image', examplePhoto.image)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(200);
//           expect(res.body.alt).to.equal(examplePhoto.alt);
//           expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
//           expect(res.body.imageURI).to.equal(awsMocks.uploadMock.Location);
//           expect(res.body.key).to.equal(awsMocks.uploadMock.Key);
//           done();
//         });
//       }); // end it block
//     }); //end 'with valid token'
//
//     describe('with no name', function(){
//       before(done => galleryMock.call(this, done));
//       it('should respond with status 400', done => {
//         request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .field('desc', examplePhoto.desc)
//         .attach('image', examplePhoto.image)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.text).to.equal('BadRequestError');
//           done();
//         });
//       });
//     });
//
//     describe('with no desc', function(){
//       before(done => galleryMock.call(this, done));
//       it('should respond with status 400', done => {
//         request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .field('name', examplePhoto.name)
//         .attach('image', examplePhoto.image)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.text).to.equal('BadRequestError');
//           done();
//         });
//       });
//     });
//
//     describe('with no image', function(){
//       before(done => galleryMock.call(this, done));
//       it('should respond with status 400', done => {
//         request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .field('desc', examplePhoto.desc)
//         .field('name', examplePhoto.name)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.text).to.equal('BadRequestError');
//           done();
//         });
//       });
//     });
//
//     describe('with invalid token', function(){
//       before(done => galleryMock.call(this, done));
//       it('should respond with status 401', done => {
//         request.post(`${url}/api/gallery/${this.tempGallery._id}/pic`)
//         .set({Authorization: `Bearer ${this.tempToken}bad`})
//         .field('desc', examplePhoto.desc)
//         .field('name', examplePhoto.name)
//         .attach('image', examplePhoto.image)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.text).to.equal('UnauthorizedError');
//           done();
//         });
//       });
//     });
//
//     describe('with invalid galleryID', function(){
//       before(done => galleryMock.call(this, done));
//       it('should respond with status 404', done => {
//         request.post(`${url}/api/gallery/${this.tempGallery._id}bad/pic`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .field('desc', examplePhoto.desc)
//         .field('name', examplePhoto.name)
//         .attach('image', examplePhoto.image)
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.text).to.equal('NotFoundError');
//           done();
//         });
//       });
//     });
//   }); //end testing POST gallery
//
//   describe('testing DELETE /api/gallery/:id/pic/pic:id', function() {
//     describe('with valid token and data', function() {
//       before(done => photoMock.call(this, done));
//       it ('should return a pic', done => {
//         request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}`)
//         .set({Authorization: `Bearer: ${this.tempToken}`})
//         .end((err, res) => {
//           if (err)
//             return done(err);
//           expect(res.status).to.equal(204);
//           done();
//         });
//       }); // end it block
//     }); //end 'with valid token'
//
//     describe('with invalid token', function(){
//       before(done => photoMock.call(this, done));
//       it('should respond with status 401', done => {
//         request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}`)
//         .set({Authorization: `Bearer ${this.tempToken}bad`})
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.text).to.equal('UnauthorizedError');
//           done();
//         });
//       });
//     });
//
//     describe('no auth header', function(){
//       before(done => photoMock.call(this, done));
//       it('should respond with status 400', done => {
//         request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}`)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.text).to.equal('BadRequestError');
//           done();
//         });
//       });
//     });
//
//     describe('with no bearer auth', function(){
//       before(done => photoMock.call(this, done));
//       it('should respond with status 400', done => {
//         request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}`)
//         .set({Authorization: 'lul this is bad'})
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.text).to.equal('BadRequestError');
//           done();
//         });
//       });
//     });
//
//     describe('with invalid galleryID', function(){
//       before(done => photoMock.call(this, done));
//       it('should respond with status 400', done => {
//         request.delete(`${url}/api/gallery/${this.tempGallery._id}bad/pic/${this.tempPic._id}`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.text).to.equal('BadRequestError');
//           done();
//         });
//       });
//     });
//
//     describe('with invalid picID', function(){
//       before(done => photoMock.call(this, done));
//       it('should respond with status 404', done => {
//         request.delete(`${url}/api/gallery/${this.tempGallery._id}/pic/${this.tempPic._id}bad`)
//         .set({Authorization: `Bearer ${this.tempToken}`})
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.text).to.equal('NotFoundError');
//           done();
//         });
//       });
//     });


  }); //end testing DELETE
///////////////////////////////////////////////////
}); //end first describe block
