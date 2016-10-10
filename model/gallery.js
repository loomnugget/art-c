'use strict';

const mongoose = require('mongoose'); // creates user Schema

const gallerySchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  desc: {type: String, required: true},
  category: {type: String, required: true}, //validated string
  created: {type: Date, required: true, default: Date.now},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  profileID: {type: mongoose.Schema.Types.ObjectId, required: true},
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'listing'}],
});

module.exports = mongoose.model('gallery', gallerySchema);
