'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:artist-route');
const createError = require('http-errors');

// app modules
const Artist = require('../model/artist.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// module constants
const artistRouter = module.exports = Router();

artistRouter.post('/api/artist', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/artist');
  req.body.userID = req.user._id;
  new Artist(req.body).save()
  .then( artist => res.json(artist))
  .catch(next);
});
