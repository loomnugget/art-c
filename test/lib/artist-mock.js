'use strict';

const debug = require('debug')('artc:artist-mock');
const userMock = require('./user-mock.js');
const Artist = require('../../model/artist.js');
const lorem = require('lorem-ipsum');

module.exports = function(done){
  debug('create artist mock');
  let exampleArtist = {
    firstname: 'george',
    lastname: 'bush',
    email: `${lorem({count: 2, units: 'word'}).split(' ').join('-')}@gmail.com`,
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
    new Artist(exampleArtist).save()
    .then( artist => {
      console.log('artist', artist);
      this.tempArtist = artist;
      done();
    });
  });
};
