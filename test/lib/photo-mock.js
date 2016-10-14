'use strict';

const debug = require('debug')('artc:photo-mock');

const awsMocks = require('./aws-mock.js');
const listingMock = require('./listing-mock.js');

const Photo = require('../../model/photo.js');

module.exports = function(done){
  debug('creating mock photo');

  let examplePhotoData = {
    name: 'example name',
    alt: 'useful photo',
    imageURI: awsMocks.uploadMock.Location,
    objectKey: awsMocks.uploadMock.Key,
  };

  listingMock.call(this, err => {
    if (err) return done(err);
    examplePhotoData.username = this.tempUser.username;
    examplePhotoData.userID = this.tempUser._id.toString();
    examplePhotoData.artistID = this.tempArtist._id.toString();
    examplePhotoData.galleryID = this.tempGallery._id.toString();
    new Photo(examplePhotoData).save()
    .then( photo => {
      this.tempPhoto = photo;
      done();
    })
    .catch(done);
  });
};
