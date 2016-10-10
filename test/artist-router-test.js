'use strict';

// npm modules
const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
// const AWS = require('aws-sdk-mock');

// app modules
const serverCtrl = require('./lib/server-control');
const cleanDB = require('./lib/clean-db');
const mockUser = require('./lib/user-mocks');
const mockArtist = require('./lib/artist-mock');

mongoose.Promise = Promise;

// module constants
const server = require('../server.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'fakeuser',
  password: '192837465',
  email: 'fake@fakestuff.fake',
};

const exampleUser2 = {
  username: 'robguy',
  password: '12345678',
  email: 'blerpderpy@blerp.com',
};

const exampleArtist = {
  firstname: 'Jimbob',
  lastname: 'Jimbobberson',
  username: 'Jimbobguy316',
  email: 'jimbobguy14@stuff.com',
  city: 'Dallas',
  zip: '98114',
  about: 'I\m just a simple kinda man who likes to do art stuff.',
  phone: '(555)555-5555',
};
