'use strict';

// npm modules
const Router = require('express').Router;
const debug = require('debug')('artc:gallery-route');
const AWS = require('aws-sdk');

// app modules
const Gallery = require('../model/gallery.js');
const Listing = require('../model/listing.js');
const pageMiddleware = require('../lib/page-query-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

// module constants
const pageRouter = module.exports = Router();

pageRouter.get('/api/gallery', pageMiddleware, function(req, res, next){
  debug('hit route GET /api/gallery');
  let offset = req.query.offset, pageSize = req.query.pagesize, page = req.query.page;
  let skip = offset + pageSize * page ;
  Gallery.find().skip(skip).limit(pageSize)
  .then(galleries => res.json(galleries))
  .catch(next);
});

pageRouter.get('/api/listing', pageMiddleware, function(req, res, next){
  debug('hit route GET /api/listing');
  let offset = req.query.offset, pageSize = req.query.pagesize, page = req.query.page;

  let skip = offset + pageSize * page ;
  Listing.find().skip(skip).limit(pageSize)
  .then( listings => res.json(listings))
  .catch(next);
});
