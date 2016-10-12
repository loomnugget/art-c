'use strict';

const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  title: {type: String, required: true},
  desc: {type: String, required: true},
  // query-sortable properties
  username: {type: String, required: true},
  category: {type: String, required: true}, // validated string
  created: {type: Date, required: true, default: Date.now},
  // path params
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  artistID: {type: mongoose.Schema.Types.ObjectId, required: true},
  galleryID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photoID: {type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('listing', listingSchema);
