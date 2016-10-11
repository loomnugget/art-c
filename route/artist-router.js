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

//TODO: Populate galleries
artistRouter.post('/api/artist', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/artist');
  req.body.userID = req.user._id;
  new Artist(req.body).save()
  .then( artist => res.json(artist))
  .catch(next);
});

artistRouter.get('/api/artist/:artistID', bearerAuth, function(req, res, next) {
  debug('GET /api/artist/:artistID');
  Artist.findById(req.params.artistID)
  .then( artist => {
    if (artist.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userid'));
    res.json(artist);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

artistRouter.put('/api/artist/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('hit route PUT /api/artist/:id');
  Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( artist => res.json(artist))
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

// artistRouter.get('/api/artist/:artistUsername', bearerAuth, function(req, res, next) {
//   debug('GET /api/artist/:artistUsername');
//   Artist.find({'artist.username': req.params.artistUsername})
//   .then( artist => {
//     if (artist.username !== req.username)
//       return next(createError(401, 'invalid username'));
//     res.json(artist);
//   })
//   .catch( err => {
//     if (err.name === 'ValidationError') return next(err);
//     next(createError(404, err.message));
//   });
// });
