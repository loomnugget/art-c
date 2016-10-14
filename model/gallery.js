'use strict';

const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  // query-sortable properties
  username: {type: String, required: true},
  category: {type: String, required: true}, //validated string
  created: {type: Date, required: true, default: Date.now},
  // path params
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  artistID: {type: mongoose.Schema.Types.ObjectId, required: true},
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'listing'}],
  photoID: {type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('gallery', gallerySchema);
