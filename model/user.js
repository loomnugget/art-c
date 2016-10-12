'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('artc:user');

// module constants
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true, minlength: 3},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  findHash: {type: String, unique: true},
});

userSchema.methods.generatePasswordHash = function(password) {
  debug('generatePasswordHash');
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password) {
  debug('comparePasswordHash');
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(createError(401, 'wrong password'));
      resolve(this);
    });
  });
};

userSchema.methods.generateFindHash = function() {
  debug('generateFindHash');
  return new Promise((resolve, reject) => {
    let tries = 0;
    _generateFindHash.call(this);
    function _generateFindHash() {
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
      .then(() => resolve(this.findHash))
      .catch( err => {
        if (tries > 3) return reject(err);
        tries++;
        _generateFindHash.call(this);
        // ^ 3 lines currently not covered
      });
    }
  });
};

userSchema.methods.generateToken = function() {
  debug('generateToken');
  return new Promise((resolve, reject) => {
    this.generateFindHash()
    .then( findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
    .catch(err => reject(err));
    // ^ 1 line currently not covered
  });
};

module.exports = mongoose.model('user', userSchema);
