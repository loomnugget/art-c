'use strict';

require('./_listing-li.scss');

module.exports = {
  template: require('./listing-li.html'),
  controller: ['$log', 'listingService',  ListingLIController],
  controllerAs: 'listingLICtrl',
  bindings: {
    listing: '<',
    deleteListingCheck: '&',
    gallery: '<',
  },
};

function ListingLIController($log, listingService){
  $log.debug('init listingLICtrl');

  this.showEditListing = false;

  this.deleteListing = function(){
    listingService.deleteListing(this.gallery, this.listing)
    .then(() => {
      this.deleteListingCheck();
    });
  };

}
