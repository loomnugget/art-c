'use strict';

const Router = require('express').Router;
const debug = require('debug')('artc:auth-router');
const jsonParser = require('body-parser').json();
const basicAuth = require('../lib/basic-auth-middleware.js');
const createError = require('http-errors');
const bearerAuth = require('../lib/bearer-auth-middleware');

const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, function(req, res, next){
  debug('hit route POST /api/signup');
  let password = req.body.password;
  delete req.body.password;
  let user = new User(req.body);

  if (!password)
    return next(createError(400, 'requires password'));

  if (password.length < 7)
    return next(createError(400, 'password must be at least 7 characters'));

  user.generatePasswordHash(password)
  .then( user => user.save())
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next);
});

authRouter.get('/api/login', basicAuth, function(req, res, next){
  debug('hit route GET /api/login');

  User.findOne({username: req.auth.username})
  .catch( err => Promise.reject(createError(404, err.message)))
  // ^ 1 line currently not covered
  .then( user => user.comparePasswordHash(req.auth.password))
  .catch(err => Promise.reject(createError(401, err.message)))
  .then( user => user.generateToken())
  .then( token => res.send(token))
  .catch(next);
});

authRouter.delete('/api/:userID/deleteAccount', bearerAuth, function(req, res, next) {
  debug('hit route DELETE /api/deleteAccount');
  User.findByIdAndRemove(req.params.userID)
  .then( user => {
    if (user.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userid'));
    res.sendStatus(204);
  })
  .catch( err => next(createError(404, err.message)));
});

authRouter.put('/api/:userID/updateEmail', bearerAuth, function(req, res, next) {
  debug('hit route PUT /api/:userID/updateEmail');
  User.findByIdAndUpdate(req.params.userID, req.body, {new: true, runValidators: true})
  .then( user => {
    res.json(user);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

authRouter.put('/api/:userID/updateUsername', bearerAuth, function(req, res, next) {
  debug('hit route PUT /api/updateUsername');
  User.findByIdAndUpdate(req.params.userID, req.body, {new: true, runValidators: true})
  .then( user => {
    res.json(user);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});

authRouter.put('/api/:userID/updatePassword', bearerAuth, function(req, res, next) {
  debug('hit route PUT /api/:userID/updatePassword');
  User.findByIdAndUpdate(req.params.userID, req.body, {new: true, runValidators: true})
  .then( user => {
    res.json(user);
  })
  .catch( err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});
