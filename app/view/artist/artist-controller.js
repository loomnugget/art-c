'use strict';

require('./_artist.scss');

module.exports = ['$log', '$location', '$rootScope', 'galleryService', 'artistService', ArtistController];

function ArtistController($log, $location, $rootScope, galleryService, artistService){
  $log.log('init artistCtrl');

  function pageLoadHandler() {
    let path = $location.path();
    if (path === '/artist') {
      this.checkArtistStatus();
    }
  }

  this.galleries = [];
  this.listings = [];
  this.artist;

  this.fetchArtistGalleries = function() {
    galleryService.fetchArtistGalleries(this.artist._id)
    .then( galleries => {
      this.galleries = galleries;
    });
  };

  this.checkArtistStatus = function() {
    $log.log('init checkartiststatus');
    artistService.checkArtist()
    .then( artist => {
      this.artist = artist;
    })
    .catch( () => {
      this.artist = null;
    });
  };
// may not need the bind
  $rootScope.$on('locationChangeSuccess', pageLoadHandler.bind(this));

  this.checkArtistStatus();
}
