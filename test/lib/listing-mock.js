'use strict';

const debug = require('debug')('artc:listing-mock');
const galleryMock = require('./gallery-mock.js');
const Listing = require('../../model/listing.js');

module.exports = function(done){
  debug('create mock listing');
  let exampleListing = {
    title: 'a cat',
    desc: 'george does cat portraits',
    category: 'portraits',
  };

  galleryMock.call(this, err => {
    if (err)
      return done(err);
    exampleListing.username = this.tempUser.username;
    exampleListing.userID = this.tempUser._id.toString();
    exampleListing.artistID = this.tempArtist._id.toString();
    exampleListing.galleryID = this.tempGallery._id.toString();
    new Listing(exampleListing).save()
    .then( listing => {
      this.tempListing = listing;
      done();
    });
  });
};
