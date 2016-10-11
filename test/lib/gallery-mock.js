'use strict';

const debug = require('debug')('artc:gallery-mock');
const artistMock = require('./artist-mock.js');
const Gallery = require('../../model/gallery.js');

module.exports = function(done){
  debug('create mock gallery');
  let exampleGallery = {
    name: 'george bush, finest collection',
    desc: 'the best portraits george has ever produced',
    category: 'portraits',
  };
  artistMock.call(this, err => {
    if (err)
      return done(err);
    exampleGallery.username = this.tempUser.username;
    exampleGallery.userID = this.tempUser._id.toString();
    exampleGallery.artistID = this.tempArtist._id.toString();
    new Gallery(exampleGallery).save()
    .then( gallery => {
      this.tempGallery = gallery;
      done();
    });
  });
};
