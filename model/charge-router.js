// npm modules
const Router = require('express').Router;
const createError = require('http-errors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const debug = require('debug')('artc:charge-route');
const jsonParser = require('body-parser').json();


// app modules
const helpers = require('../lib/helpers');
const User = require('../model/user.js');
const Product = require('../model/product.js');

// module constants
const productRouter = module.exports = Router();

productRouter.get('/products', function(req, res, next){
  return Product.find({}, function(err, data) {
    if (err) return next(err);
    return res.render('products', {products: data, user: req.user});
  });
});

productRouter.get('api/product/:id', jsonParser, function(req, res, next) {
  debug('POST /api/listing');
  Product.findById(req.params.id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(product => {
    if(product.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userid'));
    res.json(product);
  })
  .catch(err => {
    if (err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});


productRouter.get('/charge/:id', helpers.ensureAuthenticated, function(req, res, next) {
  var productID = req.params.id;
  return Product.findById(productID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('charge', {product: data, user: req.user});
    }
  });
});

productRouter.post('/stripe', helpers.ensureAuthenticated, function(req, res, next) {
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var userID = req.user._id;
  // Simple validation
  Product.findById(req.body.productID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      if (parseInt(req.body.productAmount) !== data.amount) {
        req.flash('message', {
          status: 'danger',
          value: 'Error!',
        });
        return res.redirect('/');
      } else {
        // Get product details
        User.findById(userID, function(err, data) {
          if (err) {
            return next(err);
          } else {
            data.products.push({ productID: req.body.productID, token: stripeToken });
            data.save();
          }
        });
        // Create Charge
        var charge = {
          amount: parseInt(req.body.productAmount)*100,
          currency: 'USD',
          card: stripeToken
        };
        stripe.charges.create(charge, function(err, charge) {
          if(err) {
            return next(err);
          } else {
            req.flash('message', {
              status: 'success',
              value: 'Thanks for purchasing a '+req.body.productName+'!'
            });
            res.redirect('auth/profile');
          }
        });
      }
    }
  });
});
