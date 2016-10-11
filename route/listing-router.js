'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:artist-route');
const createError = require('http-errors');

// app modules
const Gallery = require('../model/gallery.js');
const Listing = require('../model/listing.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// module constants
const listingRouter = module.exports = Router();

//TODO: Populate artists and listings
listingRouter.post('/api/gallery/:galleryID/listing', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/listing');
  Gallery.findById(req.params.galleryID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then ((gallery) => {
    req.body.galleryID = gallery._id;
    req.body.artistID = gallery.artistID;
    req.body.userID = req.user._id;
    req.body.username = req.gallery.username;
    return new Listing(req.body).save();
  })
  .then(listing => res.json(listing))
  .catch(next);
});
