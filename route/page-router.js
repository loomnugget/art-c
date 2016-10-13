'use strict';

// npm modules
const Router = require('express').Router;
//const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:gallery-route');
//const createError = require('http-errors');
const AWS = require('aws-sdk');

// app modules
const Artist = require('../model/artist.js');
const Gallery = require('../model/gallery.js');
//const Photo = require('../model/photo.js');
//const Listing = require('../model/listing.js');
//const bearerAuth = require('../lib/bearer-auth-middleware.js');
const pageMiddleware = require('../lib/page-query-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// module constants
const pageRouter = module.exports = Router();

pageRouter.get('/api/artist', pageMiddleware, function(req, res, next){
  debug('hit route GET /api/artist');
  let offset = req.query.offset, pageSize = req.query.pagesize, page = req.query.page;

  let skip = offset + pageSize * page ;
  Artist.find().skip(skip).limit(pageSize)
  .then( artists => res.json(artists))
  .catch(next);
});

pageRouter.get('/api/gallery', pageMiddleware, function(req, res, next){
  debug('hit route GET /api/gallery');
  let offset = req.query.offset, pageSize = req.query.pagesize, page = req.query.page;

  let skip = offset + pageSize * page ;
  Gallery.find().skip(skip).limit(pageSize)
  .then( galleries => res.json(galleries))
  .catch(next);
});
