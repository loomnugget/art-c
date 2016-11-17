'use strict';

module.exports = {
  template: require('./edit-listing.html'),
  controller: ['$log', 'listingService', EditListingController],
  controllerAs: 'editListingCtrl',
  bindings: {
    listing: '<',
  },
};

function EditListingController($log, listingService){
  $log.debug('init editListingCtrl');

  this.updateListing = function(){
    listingService.updateListing(this.listing, this.listing._id);
  };
}
