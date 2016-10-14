'use strict';

// NODE MODULES
const fs = require('fs');
const path = require('path');

// NPM MODULES
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const debug = require('debug')('artc:photo-router');
const createError = require('http-errors');

//APP MODULES
const Photo = require('../model/photo.js');
const Artist = require('../model/artist.js');
const Gallery = require('../model/gallery.js');
const Listing = require('../model/listing.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// MODULE CONSTANTS
const s3 = new AWS.S3();
const dataDir =`${__dirname}/../data`;
const upload = multer({dest: dataDir});
const photoRouter = module.exports = require('express').Router();

function s3UploadPromise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve(s3data);
    });
  });
}

photoRouter.post('/api/artist/:artistID/photo', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST /api/artist/:artistID/photo');

  if (!req.file)
    return next(createError(400, 'no file found'));
  if (!req.file.path)
    return next(createError(500, 'file not saved'));
  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'artc-staging-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  let tempArtist = null;

  Artist.findById(req.params.artistID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(artist => {
    tempArtist = artist;
    return s3UploadPromise(params);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let photoData = {
      name: req.body.name,
      username: req.user.username,
      alt: req.body.alt,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      artistID: tempArtist._id,
      userID: req.user._id,
    };
    return new Photo(photoData).save();
  })
  .then(photo => res.json(photo))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

photoRouter.delete('/api/artist/:artistID/photo/:photoID', bearerAuth, function(req, res, next){
  debug('hit DELETE /api/artist/:artistID/photo/:photoID');
  let tempPhoto;
  Photo.findById(req.params.photoID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( photo => {
    if(photo.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'User not authorized to delete this photo'));
    tempPhoto = photo;
    return Artist.findById(req.params.artistID);
  })
  .catch( err => err.status? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then( artist => {
    artist.photoID = null;
    return artist.save();
  })
  .then( () => {
    let params = {
      Bucket: 'artc-staging-assets',
      Key: tempPhoto.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
  .then( () => {
    return Photo.findByIdAndRemove(req.params.photoID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});

photoRouter.post('/api/gallery/:galleryID/photo', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST /api/gallery/:galleryID/photo');

  if (!req.file)
    return next(createError(400, 'no file found'));
  if (!req.file.path)
    return next(createError(500, 'file not saved'));
  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'artc-staging-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  let tempGallery = null;

  Gallery.findById(req.params.galleryID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(gallery => {
    tempGallery = gallery;
    return s3UploadPromise(params);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let photoData = {
      name: req.body.name,
      username: req.user.username,
      alt: req.body.alt,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      galleryID: tempGallery._id,
      artistID: tempGallery.artistID,
      userID: req.user._id,
    };
    return new Photo(photoData).save();
  })
  .then(photo => res.json(photo))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

photoRouter.delete('/api/gallery/:galleryID/photo/:photoID', bearerAuth, function(req, res, next){
  debug('hit DELETE /api/gallery/:galleryID/photo/:photoID');
  let tempPhoto;
  Photo.findById(req.params.photoID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( photo => {
    if(photo.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'User not authorized to delete this photo'));
    tempPhoto = photo;
    return Gallery.findById(req.params.galleryID);
  })
  .catch( err => err.status? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then( gallery => {
    gallery.photoID = null;
    return gallery.save();
  })
  .then( () => {
    let params = {
      Bucket: 'artc-staging-assets',
      Key: tempPhoto.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
  .then( () => {
    return Photo.findByIdAndRemove(req.params.photoID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});

photoRouter.post('/api/listing/:listingID/photo', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST /api/listing/:listingID/photo');

  if (!req.file)
    return next(createError(400, 'no file found'));
  if (!req.file.path)
    return next(createError(500, 'file not saved'));
  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'artc-staging-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  let tempListing = null;

  Listing.findById(req.params.listingID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(listing => {
    tempListing = listing;
    return s3UploadPromise(params);
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let photoData = {
      name: req.body.name,
      username: req.user.username,
      alt: req.body.alt,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      listingID: tempListing._id,
      artistID: tempListing.artistID,
      galleryID: tempListing.galleryID,
      userID: req.user._id,
    };
    return new Photo(photoData).save();
  })
  .then(photo => res.json(photo))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});

photoRouter.delete('/api/listing/:listingID/photo/:photoID', bearerAuth, function(req, res, next){
  debug('hit DELETE /api/listing/:listingID/photo/:photoID');
  let tempPhoto;
  Photo.findById(req.params.photoID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( photo => {
    if(photo.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'User not authorized to delete this photo'));
    tempPhoto = photo;
    return Listing.findById(req.params.listingID);
  })
  .catch( err => err.status? Promise.reject(err) : Promise.reject(createError(404, err.message)))
  .then( listing => {
    listing.photoID = null;
    return listing.save();
  })
  .then( () => {
    let params = {
      Bucket: 'artc-staging-assets',
      Key: tempPhoto.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
  .then( () => {
    return Photo.findByIdAndRemove(req.params.photoID);
  })
  .then(() => res.sendStatus(204))
  .catch(next);
});
