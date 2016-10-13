'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:gallery-route');
const createError = require('http-errors');
const AWS = require('aws-sdk');

// app modules
const Artist = require('../model/artist.js');
const Gallery = require('../model/gallery.js');
const Photo = require('../model/photo.js');
const Listing = require('../model/listing.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// module constants
const galleryRouter = module.exports = Router();
const s3 = new AWS.S3();

//TODO: Refactor all routes to take in /api/artist/:artistID/gallery/:galleryID'
galleryRouter.post('/api/artist/:artistID/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/gallery');
  let tempArtist;
  let tempGallery;
  Artist.findById(req.params.artistID)
  .catch(err => Promise.reject(createError(404, err.message)))
  // ^ 1 line currently not covered
  .then ((artist) => {
    tempArtist = artist;
    req.body.artistID = artist._id;
    req.body.userID = req.user._id;
    req.body.username = artist.username;
    return new Gallery(req.body).save();
  })
  .then( gallery => {
    tempGallery = gallery;
    tempArtist.galleries.push(gallery._id);
    return tempArtist.save();
  })
  .then(() => res.json(tempGallery))
  .catch(next);
});

//TODO: Refactor all routes to take in /api/artist/:artistID/gallery/:galleryID'
galleryRouter.get('/api/gallery/:galleryID', bearerAuth, function(req, res, next) {
  debug('GET /api/gallery/:galleryID');
  Gallery.findById(req.params.galleryID)
  .populate({path: 'listings'})
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

galleryRouter.put('/api/artist/:artistID/gallery/:galleryID', bearerAuth, jsonParser, function(req, res, next) {
  //if artistID !== the req.params.artistID, reject error
  debug('hit route PUT /api/gallery/:galleryID');
  Gallery.findByIdAndUpdate(req.params.galleryID, req.body, {new: true, runValidators: true})
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

galleryRouter.delete('/api/artist/:artistID/gallery/:galleryID', bearerAuth, function(req, res, next) {
  debug('hit route DELETE /api/gallery/:galleryID');

  Gallery.findById(req.params.galleryID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( gallery => {
    if (gallery.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'unauthorized'));
    return Gallery.findByIdAndRemove(req.params.galleryID);
  })
  .catch( err => Promise.reject(err))
  .then( () => Listing.remove({ galleryID: req.params.galleryID}))
  .then( () => Photo.find({galleryID: req.params.galleryID}))
  .then (photos => {
    if(photos) {
      console.log('PHOTOS', photos);
      photos.forEach((photo) => {
        s3.deleteObject({
          Bucket: 'artc-staging-assets',
          Key: photo.objectKey,
        }).promise();
      });
    }
  })
  .then( () => Photo.remove({galleryID: req.params.galleryID}))
  .then( () => {
    Artist.findById(req.params.artistID)
    .then( artist => {
      artist.galleries.splice(req.params.galleryID, 1);
      return artist.save();
    });
  })
  .then( () => res.sendStatus(204))
  .catch(next);
});
