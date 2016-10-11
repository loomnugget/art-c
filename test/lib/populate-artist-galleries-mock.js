'use strict';

const debug = require('debug')('artc-populate-artist-mocks');
const artistMock = require('./artist-mock.js');
const Gallery = require('../../model/gallery.js');
const lorem = require('lorem-ipsum');

module.exports = function(count, done){
  debug('mocking multiple galleries');
  artistMock.call(this, err => {
    if (err) return done(err);
    let galleriesMock = [];
    let userID = this.tempUser._id.toString();
    let artistID = this.tempArtist._id.toString();
    let username = this.tempUser.username;
    for(var i=0; i<count; i++){
      galleriesMock.push(mockGallery(userID, artistID, username));
    }
    Promise.all(galleriesMock)
    .then( galleries => {
      galleries.forEach(gallery => {
        let galleryID = gallery._id.toString();
        this.tempArtist.galleries.push(galleryID);
      });
      this.tempGalleries = galleries;
      return this.tempArtist.save();
    })
    .then(() => done())
    .catch(done);
  });
};

function mockGallery(userID, artistID, username){
  let name = lorem({count: 2, units: 'word'});
  let desc = lorem({count: 2, units: 'sentence'});
  let category = lorem({count: 2, units: 'word'});
  let exampleGallery = { name, desc, category, userID, artistID, username };
  return new Gallery(exampleGallery).save();
}
