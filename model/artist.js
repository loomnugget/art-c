'use strict';

const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  firstname: {type: String, required: true, minlength: 3},
  lastname: {type: String, required: true, minlength: 3},
  username: {type: String, required: true},
  email: {type: String, required: true},
  city: {type: String, required: true},
  zip: {type: String, required: true},
  about: {type: String},
  phone: {type: String},
  created: {type: Date, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  photoID: {type: mongoose.Schema.Types.ObjectId, required: true},

});

module.exports = mongoose.model('artist', artistSchema);
