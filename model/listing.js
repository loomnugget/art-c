'use strict';

const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
  //title
  //description
  //Category
  //photo[pop]
  created: {type: Date, required: true, default: Date.now},
  //username
  galleryID: {type: mongoose.Schema.Types.ObjectId, required: true},
  profileID: {type: mongoose.Schema.Types.ObjectId, required: true},


});

module.exports = mongoose.model('listing', listingSchema);
