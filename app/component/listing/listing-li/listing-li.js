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

  this.handleEditListing = function(){
    this.showEditListing = false;
  };

  this.deleteListing = function(){
    console.log(this.gallery, 'this.gallery');
    listingService.deleteListing(this.gallery, this.listing)
    .then(() => {
      this.deleteListingCheck();
    });
  };

}
