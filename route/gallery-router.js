'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:artist-route');
const createError = require('http-errors');

// app modules
const Gallery = require('../model/artist.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// module constants
const galleryRouter = module.exports = Router();

//TODO: Populate artists and listings
galleryRouter.post('/api/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/gallery');
  // req.body.userID = req.user._id;
  req.body.artistID = req.artist._id;

  new Gallery(req.body).save()
  .then( gallery => res.json(gallery))
  .catch(next);
});
