'use strict';

const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  name: {type: String, required: true},
  alt: {type: String, required: true},
  key: {type: String, required: true, unique:true},
  imageURI: {type: String, required: true, unique:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  artistID: {type: mongoose.Schema.Types.ObjectId, required: true},
  galleryID: {type: mongoose.Schema.Types.ObjectId},
  listingID: {type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('photo', photoSchema);
