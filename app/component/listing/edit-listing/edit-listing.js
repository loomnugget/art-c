'use strict';

module.exports = {
  template: require('./edit-listing.html'),
  controller: ['$log', 'listingService', EditListingController],
  controllerAs: 'editListingCtrl',
  bindings: {
    listing: '<',
    gallery: '<',
  },
};

function EditListingController($log, listingService){
  $log.debug('init editListingCtrl');

  this.updateListing = function(){
    $log.debug('editListingCtrl.updateListing()');

    listingService.updateListing(this.gallery, this.listing);
  };
}
