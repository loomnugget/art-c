'use strict';

require('./_artist.scss');

module.exports = ['$log', '$location', '$rootScope', '$window', 'galleryService', 'listingService', 'artistService', ArtistController];

function ArtistController($log, $location, $rootScope, $window, galleryService, listingService, artistService){
  $log.log('init artistCtrl');

  this.galleries = [];
  this.listings = [];
  this.artist;

  this.isVisible = false;

  this.showArtistInfo = function() {
    this.isVisible = true;
  };

  this.galleryDeleteCheck = function(gallery){
    $log.debug('init artistCtrl.galleryDeleteCheck');
    if (this.currentGallery._id === gallery._id){
      this.currentGallery = null;
    }
  };

  this.checkArtistStatus = function() {
    $log.log('init checkartiststatus');
    return artistService.checkArtist()
    .then( artist => {
      return this.artist = artist;
    })
    .then(() => {
      return this.fetchArtistGalleries(this.artist._id);
    })
    .catch( () => {
      this.artist = null;
    });
  };

  this.fetchArtistGalleries = function() {
    return galleryService.fetchArtistGalleries(this.artist._id)
    .then( galleries => {
      this.galleries = galleries;
      this.gallery = galleries[0];
    });
  };

  this.fetchArtistListings = function() {
    $log.log('artistCtrl.fetchArtistListings');
    return listingService.fetchGalleryListings(this.gallery._id)
    .then(listings => {
      this.listings = listings;
      this.gallery.listings = listings;
    });
  };

  this.artistFormSubmission = function(){
    $log.debug('artistCtrl.artistFormSubmission');
    this.checkArtistStatus();
  };

  this.pageLoad = function(){
    this.fetchArtistGalleries()
    .then(() => {
      this.fetchArtistListings();
    });
  };

  this.setup = function(){
    this.checkArtistStatus()
    .then(() => {
      this.pageLoad();
    });
  };

  $rootScope.$on('$stateChangeStart', () => {
    this.setup();
  });

  $window.onload = function(){
    this.setup();
  };

  this.$onInit = function(){
    this.setup();
  };
}
