'use strict';

'use strict';

// NODE MODULES
const fs = require('fs');
const path = require('path'); //has ext paramater to get extension name of file

// NPM MODULES
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer'); //body parser
const debug = require('debug')('TastyToast:pic-router');
const createError = require('http-errors');

//APP MOUDLES
const Photo = require('../model/photo.js');
//const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// MODULE CONSTANTS
const BUCKET = process.env.BUCKET;
const s3 = new AWS.S3();
const dataDir =`${__dirname}/../data`;
const upload = multer({dest: dataDir});
const picRouter = module.exports = require('express').Router();

function s3UploadPromise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve(s3data);
    });
  });
}

picRouter.post('/api/artist/:artistID/photo', upload.single('image'), function(req, res, next){
  debug('hit POST /api/artist/:artistID/photo');

  if (!req.file)
    return next(createError(400, 'no file found'));
  if (!req.file.path)
    return next(createError(500, 'file not saved'));
  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  }

  .then(() => s3UploadPromise(params))
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let photoData = {
      alt: req.body.alt,
      key: s3data.Key,
      imageURI: s3data.Location,
      artistID: req.user._id,
    };
    return new Photo(photoData).save();
  })
  .then(photo => res.json(photo))
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});
