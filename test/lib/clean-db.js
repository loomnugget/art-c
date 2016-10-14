'use strict';

const debug = require('debug')('artc:clean-db');

const User = require('../../model/user.js');
const Photo = require('../../model/photo.js');
const Artist = require('../../model/artist.js');
const Gallery = require('../../model/gallery.js');
const Listing = require('../../model/listing.js');


module.exports = function(done){
  debug('clean up database');
  Promise.all([
    Photo.remove({}),
    User.remove({}),
    Artist.remove({}),
    Gallery.remove({}),
    Listing.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
