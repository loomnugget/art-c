'use strict';

const debug = require('debug')('artc:mock-many-photos');
const Photo = require('../../model/photo.js');
const listingMock = require('./listing-mock.js');
const lorem = require('lorem-ipsum');

module.exports = function(count, done){
  debug('mock multiple photos');
  listingMock.call(this, err => {
    if (err) return done(err);
    let photoMocks = [];
    let userID = this.tempUser._id.toString();
    let artistID = this.tempArtist._id.toString();
    let galleryID = this.tempGallery._id.toString();
    let listingID = this.tempListing._id.toString();
    let username = this.tempUser.username;
    for(var i=0; i<count; i++){
      photoMocks.push(mockPic(userID, artistID, galleryID, listingID, username));
    }
    return Promise.all(photoMocks)
    .then( photos => {
      this.tempPhotos = photos;
      done();
    })
    .catch(done);
  });
};

function mockPic(userID, artistID, galleryID, listingID, username){
  let name = lorem({count:2, units: 'word'});
  let alt = lorem({count:2, units: 'word'});
  let objectKey = lorem({count:4, units: 'word'}).split(' ').join('');
  let uri = lorem({count:4, units: 'word'}).split('').join('-');
  let imageURI = `https://${uri}/${objectKey}`;
  let examplePhoto = {
    name,
    alt,
    objectKey,
    imageURI,
    username,
    userID,
    artistID,
    galleryID,
    listingID,
  };
  return new Photo(examplePhoto).save();
}
