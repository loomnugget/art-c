'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:artist-route');
const createError = require('http-errors');
const AWS = require('aws-sdk');

// app modules
const Artist = require('../model/artist.js');
const Gallery = require('../model/gallery.js');
const Listing = require('../model/listing.js');
const Photo = require('../model/photo.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// module constants
const artistRouter = module.exports = Router();
const s3 = new AWS.S3();

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
  .populate({path: 'galleries'})
  .then( artist => {
    res.json(artist);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

artistRouter.put('/api/artist/:artistID', bearerAuth, jsonParser, function(req, res, next) {
  debug('hit route PUT /api/artist/:artistID');
  Artist.findById(req.params.artistID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( artist => {
    if (artist.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid userid'));
    return Artist.findByIdAndUpdate(req.params.artistID, req.body, {new: true, runValidators: true});
  })
  .then(artist => res.json(artist))
  .catch(next);
});

artistRouter.delete('/api/artist/:artistID', bearerAuth, function(req, res, next) {
  debug('hit route DELETE /api/artist/:artistID');
  Artist.findById(req.params.artistID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( artist => {
    if (artist.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'unauthorized'));
    return Artist.findByIdAndRemove(req.params.artistID);
  })
  .catch( err => Promise.reject(err, err.message))
  .then( () => Listing.remove({ artistID: req.params.artistID}))
  .then( () => Gallery.remove({ artistID: req.params.artistID}))
  .then( () => Photo.find({ artistID: req.params.artistID}))
  .then( photos => {
    let s3DeletePhotoArray = [];
    for(var i=0; i<photos.length; i++){
      s3DeletePhotoArray.push(s3.deleteObject({
        Bucket: 'artc-staging-assets',
        Key: photos[i].objectKey,
      }).promise());
    }
    return Promise.all(s3DeletePhotoArray);
  })
  .then( () => Photo.remove({ artistID: req.params.artistID}))
  .then( () => res.sendStatus(204))
  .catch(next);
});
