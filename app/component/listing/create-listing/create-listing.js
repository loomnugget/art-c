'use strict';

module.exports = {
  template: require('./create-listing.html'),
  controller: ['$log', 'listingService', CreateListingController],
  controllerAs: 'createListingCtrl',
  bindings: {
    artist: '<',
  },
};

function CreateListingController($log, listingService){
  $log.debug('init createListingCtrl');

  this.createListing = function(){
    listingService.createListing(this.artist._id, this.listing)
    .then(() => {
      this.listing.title = null;
      this.listing.desc = null;
      this.listing.category = null;
      this.listing.created = null;
    });
  };
}
