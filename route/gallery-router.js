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

galleryRouter.post('/api/artist/:artistID/gallery', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/gallery');
  let tempArtist;
  let tempGallery;
  Artist.findById(req.params.artistID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then ( artist => {
    if (artist.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid user'));
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

galleryRouter.get('/api/gallery/:galleryID', bearerAuth, function(req, res, next) {
  debug('GET /api/gallery/:galleryID');
  Gallery.findById(req.params.galleryID)
  .populate('listings')
  .then( gallery => {
    res.json(gallery);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

galleryRouter.get('/api/artist/:artistID/gallery', bearerAuth, function(req, res, next){
  debug('GET /api/artist/:artistID/gallery');
  // let offset = req.query.offset, pageSize = req.query.pagesize, page = req.query.page;
  // let skip = offset + pageSize * page;
  Gallery.find({artistID: req.params.artistID})
  .populate('listings')
  .populate('listings.photoID')
  .populate('photoID')
  .then(galleries => res.json(galleries))
  .catch(next);
});

galleryRouter.put('/api/artist/:artistID/gallery/:galleryID', bearerAuth, jsonParser, function(req, res, next) {
  debug('hit route PUT /api/gallery/:galleryID');
  Gallery.findById(req.params.galleryID)
  .populate('listings')
  .populate('listings.photoID')
  .populate('photoID')
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( gallery => {
    if (gallery.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userid'));
    return Gallery.findByIdAndUpdate(req.params.galleryID, req.body, {new: true, runValidators: true});
  })
  .then(gallery => {
    res.json(gallery);
  })
  .catch(next);
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
  .then( () => Photo.remove({galleryID: req.params.galleryID}))
  .then( () => {
    Artist.findById(req.params.artistID)
    .then( artist => {
      artist.galleries.forEach( gallery => {
        if(artist.galleries[gallery] === req.params.galleryID)
          artist.galleries.splice(artist.galleries.indexOf(gallery), 1);
      });
      return artist.save();
    });
  })
  .then( () => res.sendStatus(204))
  .catch(next);
});
