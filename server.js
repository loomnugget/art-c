'use strict';

// npm modules
const express = require('express');
const morgan = require('morgan');
const Promise = require('bluebird');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('artc:server');
const dotenv = require('dotenv');

// app modules
const authRouter = require('./route/auth-router.js');
const artistRouter = require('./route/artist-router.js');
const galleryRouter = require('./route/gallery-router.js');
const listingRouter = require('./route/listing-router.js');
const photoRouter = require('./route/photo-router.js');
const pageRouter = require('./route/page-router.js');

const errorMiddleware = require('./lib/error-middleware.js');
// load env variables
dotenv.load();

// connect to mongo database
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// module constants
const PORT = process.env.PORT;
const app = express();

// app middleware
app.use(cors());
app.use(morgan('dev'));

// app routes
app.use(authRouter);
app.use(artistRouter);
app.use(galleryRouter);
app.use(listingRouter);
app.use(photoRouter);
app.use(pageRouter);
app.use(errorMiddleware);

// start server
const server = module.exports = app.listen(PORT, function() {
  debug('server started');
});

server.isRunning = true;
