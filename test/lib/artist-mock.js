'use strict';

const debug = require('debug')('artc:artist-mock');
const userMock = require('./user-mock.js');
const Artist = require('../../model/artist.js');
const lorem = require('lorem-ipsum');

module.exports = function(done){
  debug('create artist mock');
  let exampleArtist = {
    firstname: lorem({count:2, units: 'word'}),
    lastname: lorem({count:2, units: 'word'}),
    city: lorem({count:2, units: 'word'}),
    zip: lorem({count:2, units: 'word'}),
    about: lorem({count:2, units: 'sentence'}),
    phone: lorem({count:2, units: 'word'}),
  };
  userMock.call(this, err => {
    if(err)
      return done(err);
    exampleArtist.userID = this.tempUser._id.toString();
    exampleArtist.username = this.tempUser.username;
    exampleArtist.email = this.tempUser.email;
    new Artist(exampleArtist).save()
    .then( artist => {
      this.tempArtist = artist;
      done();
    });
  });
};
