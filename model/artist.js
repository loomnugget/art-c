'use strict';

const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  about: {type: String},
  phone: {type: String, unique: true},
  email: {type: String, unique: true},
  // query-sortable properties
  username: {type: String, unique: true},
  created: {type: Date, required: true, default: Date.now},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  city: {type: String, required: true},
  zip: {type: String, required: true},
  // path params
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  galleries: [{type: mongoose.Schema.Types.ObjectId, ref: 'gallery'}],
  photoID: {type: mongoose.Schema.Types.ObjectId, ref: 'photo'},
});

module.exports = mongoose.model('artist', artistSchema);
