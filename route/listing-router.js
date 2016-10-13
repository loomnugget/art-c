'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:listing-route');
const createError = require('http-errors');
const AWS = require('aws-sdk');

// app modules
const Gallery = require('../model/gallery.js');
const Photo = require('../model/photo.js');
const Listing = require('../model/listing.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));


// module constants
const listingRouter = module.exports = Router();
const s3 = new AWS.S3();

listingRouter.post('/api/gallery/:galleryID/listing', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST /api/listing');
  let tempGallery, tempListing;
  Gallery.findById(req.params.galleryID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then ((gallery) => {
    if (gallery.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid user'));
    req.body.galleryID = gallery._id;
    req.body.artistID = gallery.artistID;
    req.body.userID = req.user._id;
    req.body.username = req.user.username;
    tempGallery = gallery;
    return new Listing(req.body).save();
  })
  .then(listing => {
    tempGallery.listings.push(listing._id);
    tempListing = listing;
    return tempGallery.save();
  })
  .then(() => res.json(tempListing))
  .catch(next);
});

listingRouter.get('/api/listing/:listingID', bearerAuth, function(req, res, next) {
  debug('GET /api/listing/:listingID');
  Listing.findById(req.params.listingID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(listing => {
    res.json(listing);
  })
  .catch(next);
});

listingRouter.put('/api/gallery/:galleryID/listing/:listingID', bearerAuth, jsonParser, function(req, res, next) {
  debug('hit route PUT /api/gallery/:galleryID/listing/:listingID');
  Listing.findById(req.params.listingID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( listing => {
    if(listing.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid userid'));
    return Listing.findByIdAndUpdate(req.params.listingID, req.body, {new: true, runValidators: true});
  })
  .then(listing => {
    res.json(listing);
  })
  .catch(next);
});

listingRouter.delete('/api/gallery/:galleryID/listing/:listingID', bearerAuth, function(req, res, next) {
  debug('hit route DELETE /api/gallery/:galleryID/listing/:listingID');
  Listing.findById(req.params.listingID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( listing => {
    if(listing.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'invalid userid'));
    return Gallery.findById(req.params.galleryID);
  })
  .catch( err => err.status? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then( gallery => {
    gallery.listings.forEach( listing => {
      if (gallery.listings[listing] === req.params.listingID)
        gallery.listings.splice(gallery.listings.indexOf(listing), 1);
    });
    return gallery.save();
  })
  .then( () => Photo.find({listingID: req.params.listingID}))
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
  .then( () => Photo.remove({listingID: req.params.listingID}))
  .then( () => Listing.findByIdAndRemove(req.params.listingID))
  .then( () => res.sendStatus(204))
  .catch(next);
});
