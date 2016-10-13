'use strict';

// npm modules
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artc:gallery-route');
const createError = require('http-errors');
const AWS = require('aws-sdk');

// app modules
//const Artist = require('../model/artist.js');
const Gallery = require('../model/gallery.js');
//const Photo = require('../model/photo.js');
//const Listing = require('../model/listing.js');
//const bearerAuth = require('../lib/bearer-auth-middleware.js');
const pageMiddleware = require('../lib/page-query-middeware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// module constants
const pageRouter = module.exports = Router();

pageRouter.get('/api/gallery', pageMiddleware, function(req, res, next){
  debug('hit route GET /api/fruit');
  let offset = req.query.offset;
  let pagesize = req.query.pagesize;
  let page = req.query.page;
  let skip = offset + pagesize * page;

  Gallery.find().skip(skip).limit(pagesize) 
  .then(galleries => res.json(galleries))
  .catch(next);
});

pageRouter.get('/api/listing', pageMiddleware, function(req, res, next){
  debug('hit route GET /api/listing');
  let offset = req.query.offset;
  let pagesize = req.query.pagesize;
  let page = req.query.page;
  let skip = offset + pagesize * page;

  Listing.find().skip(skip).limit(pagesize)

  .then(listings => res.json(listings))
  .catch(next);
});
