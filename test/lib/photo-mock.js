'use strict';

const debug = require('debug')('artc:photo-mock');

const Photo = require('../../model/photo.js');
//const artistMock = require('./user-mock.js');

module.exports = function(done){
  debug('creating mock photo');
  let examplePhotoData = {
    name: 'example name',
    alt: 'useful photo',
    imageURI: awsMocks.uploadMock.Location,
    Key: awsMocks.uploadMock.Key,
  };
};
