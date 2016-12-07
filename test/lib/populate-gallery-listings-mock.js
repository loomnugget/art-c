'use strict';

const debug = require('debug')('artc:populate-gallery-listings');
const galleryMock = require('./gallery-mock.js');
const Listing = require('../../model/listing.js');
const lorem = require('lorem-ipsum');

module.exports = function(count, done){
  debug('creating multiple listings');
  galleryMock.call(this, err => {
    if (err) return done(err);
    let listingsMock = [];
    let userID = this.tempUser._id.toString();
    let artistID = this.tempArtist._id.toString();
    let galleryID = this.tempGallery._id.toString();
    let username = this.tempUser.username;
    for(var i=0; i<count; i++){
      listingsMock.push(mockListing(userID, artistID, galleryID, username));
    }
    Promise.all(listingsMock)
    .then( listings => {
      listings.forEach( listing => {
        let listingID = listing._id.toString();
        this.tempGallery.listings.push(listingID);
      });
      this.tempListings = listings;
      return this.tempGallery.save();
    })
    .then(() => done())
    .catch(done);
  });
};

function mockListing(userID, artistID, galleryID, username){
  let title = lorem({count: 2, units: 'word'});
  let desc = lorem({count: 2, units: 'sentence'});
  let category = lorem({count: 1, units: 'word'});
  let exampleListing = { title, desc, category, userID, artistID, galleryID, username};
  return new Listing(exampleListing).save();
}
