'use strict';

const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  key: {type: String, required: true},
  alt: {type: String, required: true},
  imageURI: {type: String, required: true, unique:true},
  artistID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('photo', photoSchema);
