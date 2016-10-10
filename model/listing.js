'use strict';

const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  title: {type: String, required: true},
  desc: {type: String, required: true},
  category: {type: String, required: true},
  photo: {type: String, required: true},
  username: {type: String, required: true},
  created: {type: Date, required: true, default: Date.now},
  galleryID: {type: mongoose.Schema.Types.ObjectId, required: true},
  profileID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('listing', listingSchema);
