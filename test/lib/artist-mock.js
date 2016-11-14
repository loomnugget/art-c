'use strict';

const debug = require('debug')('artc:artist-mock');
const userMock = require('./user-mock.js');
const Artist = require('../../model/artist.js');

module.exports = function(done){
  debug('create artist mock');
  let exampleArtist = {
    firstname: 'george',
    lastname: 'bush',
    city: 'houston',
    zip: '85749',
    about: 'former president of the united states of america, avid painter',
    phone: '7328851234',
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
