'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:gallery-route');
const createError = require('http-errors');

// app modules
const Artist = require('../model/artist.js');
const Gallery = require('../model/gallery.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// module constants
const galleryRouter = module.exports = Router();

//TODO: Populate artists and listings
galleryRouter.post('/api/artist/:artistID/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/gallery');
  let tempArtist;
  Artist.findById(req.params.artistID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then ((artist) => {
    tempArtist = artist;
    req.body.artistID = artist._id;
    req.body.userID = req.user._id;
    req.body.username = artist.username;
    return new Gallery(req.body).save();
  })
  .then( gallery => {
    tempArtist.galleries.push(gallery._id);
    tempArtist.save();
    res.json(gallery);
  })
  .catch(next);
});

galleryRouter.get('/api/gallery/:galleryID', bearerAuth, function(req, res, next) {
  debug('GET /api/gallery/:galleryID');
  Gallery.findById(req.params.galleryID)
  .then( gallery => {
    if (gallery.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userid'));
    res.json(gallery);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

galleryRouter.put('/api/gallery/:galleryID', bearerAuth, jsonParser, function(req, res, next) {
  debug('hit route PUT /api/gallery/:galleryID');
  Gallery.findByIdAndUpdate(req.params.galleryID, req.body, {new: true})
  .then( gallery => res.json(gallery))
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

//TODO: Delete the reference of gallery to its associated artist
galleryRouter.delete('/api/gallery/:galleryID', bearerAuth, function(req, res, next) {
  debug('hit route DELETE /api/gallery/:galleryID');
  Gallery.findByIdAndRemove(req.params.galleryID)
  .then( () => res.sendStatus(204))
  .catch( err => next(createError(404, err.message)));
});
