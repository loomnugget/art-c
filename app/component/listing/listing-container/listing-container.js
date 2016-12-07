'use strict';

module.exports = {
  template: require('./listing-container.html'),
  controller: ['$log', 'listingService', ListingContainerController],
  controllerAs: 'listingContainerCtrl',
  bindings: {
    gallery: '<',
  },
};

function ListingContainerController($log, listingService){
  $log.debug('init listingContainerCtrl');

  this.currentListingCheck = function(){
    listingService.fetchGalleryListings(this.gallery._id);
  };
}
