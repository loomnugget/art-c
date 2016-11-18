'use strict';

module.exports = {
  template: require('./edit-listing.html'),
  controller: ['$log', 'listingService', EditListingController],
  controllerAs: 'editListingCtrl',
  bindings: {
    listing: '<',
    onSuccess: '&',
  },
};

function EditListingController($log, listingService){
  $log.debug('init editListingCtrl');

  this.updateListing = function(){
    $log.debug('editListingCtrl.updateListing()');

    listingService.updateListing(this.listing)
    .then(() => {
      this.onSuccess();
    });
  };
}
