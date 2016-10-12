'use strict';

// NODE MODULES
const fs = require('fs');
const path = require('path'); //has ext paramater to get extension name of file

// NPM MODULES
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer'); //body parser
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
    // ^ 1 line currently not covered
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


// photoRouter.delete('/api/artist/:artistID/photo/:photoID', bearerAuth, function(req, res, next){
//   debug('hit DELETE /api/artist/:artistID/photo/:photoID');
//  // check if photo exists
//   Photo.findById(req.params.photoID)
//   .catch(err => Promise.reject(createError(404, err.message)))
//   .then( photo => {
//     if(photo.artistID.toString() !== req.params.artistID)
//       return Promise.reject(createError(400, 'Bad request - wrong artist'));
//     // make sure the user id matches the photo.user id
//
//     if(photo.userID.toString() !== req.user._id.toString())
//       return Promise.reject(createError(401, 'User not authorized to delete this photo'));
//
//     let params = {
//       ACL: 'public-read',
//       Bucket: 'artc-staging-assets',
//       Key: photo.key,
//       Body:
//     };
//
//     return s3.deleteObject(params).promise();
//   })
//   .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
//   .then( () => {
//     return Photo.findByIdAndRemove(req.params.photoID);
//   })
//   .then(() => res.sendStatus(204))
//   .catch(next);
// });
//

photoRouter.post('/api/gallery/:galleryID/photo', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST /api/gallery/:galleryID/photo');

  if (!req.file)
    return next(createError(400, 'no file found'));
  if (!req.file.path)
    return next(createError(500, 'file not saved'));
    // ^ 1 line currently not covered
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
  // ^ 1 line currently not covered
  .then(gallery => {
    tempGallery = gallery;
    return s3UploadPromise(params); //if fails 500
  })
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  // ^ 1 line currently not covered
  .then(s3data => {
    del([`${dataDir}/*`]);
    let photoData = {
      name: req.body.name,
      username: req.user.username,
      alt: req.body.alt,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      galleryID: tempGallery._id,
      userID: req.user._id,
    };
    return new Photo(photoData).save();
  })
  .then(photo => res.json(photo))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
    // ^ 2 lines currently not covered
  });
});
//
// photoRouter.delete('/api/gallery/:galleryID/photo/:photoID', bearerAuth, function(req, res, next){
//   debug('hit DELETE /api/gallery/:galleryID/photo/:photoID');
//  // check if photo exists
//   Photo.findById(req.params.photoID)
// //  .catch(err => Promise.reject(createError(404, err.message)))
//   .then( photo => {
//     if(photo.galleryID.toString() !== req.params.galleryID)
//       return Promise.reject(createError(400, 'Bad request - wrong gallery'));
//     // make sure the user id matches the photo.user id
//
//     if(photo.userID.toString() !== req.user._id.toString())
//       return Promise.reject(createError(401, 'User not authorized to delete this photo'));
//
//     let params = {
//       Bucket: 'artc-staging-assets',
//       Key: photo.objectKey,
//     };
//
//     return s3.deleteObject(params).promise();
//   })
//   .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
//   .then( () => {
//     return Photo.findByIdAndRemove(req.params.photoID);
//   })
//   .then(() => res.sendStatus(204))
//   .catch(next);
// });

photoRouter.post('/api/listing/:listingID/photo', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST /api/listing/:listingID/photo');

  if (!req.file)
    return next(createError(400, 'no file found'));
  if (!req.file.path)
    return next(createError(500, 'file not saved'));
    // ^ 1 line currently not covered
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



// /api/gallery/:galleryID/photo/:photoID - PUT and DELETE

// api/listing/:listingID/photo/:photoID - PUT and DELETE
