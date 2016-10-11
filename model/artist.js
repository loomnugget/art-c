'use strict';

const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  firstname: {type: String, required: true, minlength: 3},
  lastname: {type: String, required: true, minlength: 3},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  city: {type: String, required: true},
  zip: {type: String, required: true},
  about: {type: String},
  phone: {type: String, unique: true},
  created: {type: Date, required: true, default: Date.now},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photoID: {type: mongoose.Schema.Types.ObjectId},
  galleries: [{type: mongoose.Schema.Types.ObjectId, ref: 'gallery'}],
});

module.exports = mongoose.model('artist', artistSchema);
