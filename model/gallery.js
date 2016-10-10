'use strict';

const mongoose = require('mongoose'); // creates user Schema

const gallerySchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  created: {type: Date, required: true, default: Date.now},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  //- Profile ID
  //- Category (validated string)
  //- Gallery Name
  //- Description
  //- Created on (date)
  //- UserID
  //- listingIDs [pop]
  //username
});

module.exports = mongoose.model('gallery', gallerySchema);
