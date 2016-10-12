'use strict';

const debug = require('debug')('artc:photo-mock');

const awsMocks = require('./aws-mock.js');
const artistMock = require('./artist-mock.js');
const Photo = require('../../model/photo.js');

module.exports = function(done){
  debug('creating mock photo');

  let examplePhotoData = {
    name: 'example name',
    alt: 'useful photo',
    imageURI: awsMocks.uploadMock.Location,
    key: awsMocks.uploadMock.Key,
  };

  artistMock.call(this, err => {
    if (err)
      return done(err);
    examplePhotoData.artistID = this.tempArtist._id.toString();
    examplePhotoData.userID = this.tempUser._id.toString();
    new Photo(examplePhotoData).save()
    .then( photo => {
      this.tempPhoto = photo;
      done();
    })
    .catch(done);
  });
};
