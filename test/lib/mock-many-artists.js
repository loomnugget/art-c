'use strict';

const debug = require('debug')('artc-populate-artist-mocks');
const userMock = require('./user-mock.js');
const Artist = require('../../model/artist.js');
const lorem = require('lorem-ipsum');

module.exports = function(count, done){
  userMock.call(this, err => {
    let username = this.tempUser.username;
    debug('mock multiple artists');
    let artistMocks = [];
    for(var i=0; i<count; i++){
      artistMocks.push(mockArtist(userID, username));
    }
    return Promise.all(artistMocks)
    .then( artists => {
      this.tempArtists = artists;
      done();
    })
    .catch(done);
  });
};

function mockArtist(userID, artistID, email, username){
  let email = lorem({count:2, units: 'word'});
  let exampleArtist = {
    email,
    username,
    firstname,
    lastname,
    city,
    zip,
    userID,
  };
  return new Artist(exampleArtist).save();
}
