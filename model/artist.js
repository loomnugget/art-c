'use strict';

const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  about: {type: String},
  phone: {type: String, unique: true},
  email: {type: String, required: true, unique: true},
  // query-sortable properties
  username: {type: String, required: true, unique: true},
  created: {type: Date, required: true, default: Date.now},
  firstname: {type: String, required: true, minlength: 3},
  lastname: {type: String, required: true, minlength: 3},
  city: {type: String, required: true},
  zip: {type: String, required: true},
  // path params
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  galleries: [{type: mongoose.Schema.Types.ObjectId, ref: 'gallery'}],
  photoID: {type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('artist', artistSchema);
