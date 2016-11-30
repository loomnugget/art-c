'use strict';

require('./_listing-pic.scss');

module.exports = {
  template: require('./listing-pic.html'),
  controller: ['$log', '$location', '$window', 'picService', ListingPicController],
  controllerAs: 'listingPicCtrl',
  bindings: {
    listing: '<',
  },
};

function ListingPicController($log, $location, $window, picService) {
  $log.debug('init listingPicCtrl');

  this.defaultPic = require('../../../scss/images/default-thumbnail.jpg');
  this.pic = {};
  this.done = function(){
    $log.debug('WORKING');
    this.reloadRoute();
    this.pic.file = null;
  };

  this.reloadRoute = function(){
    $window.location.reload();
  };

  this.uploadListingPic = function(){
    picService.uploadListingPic(this.listing, this.pic)
    .then(pic => {
      this.listing.photoID = pic;
    });
  };
}
