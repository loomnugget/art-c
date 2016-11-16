'use strict';

require('./_artist.scss');

module.exports = ['$log', '$rootScope', 'galleryService', ArtistController];

function ArtistController($log, $rootScope, galleryService){
  $log.log('init artistCtrl');

  this.galleries = [];
  this.listings = [];

  this.fetchArtistGalleries = function(){
    galleryService.fetchArtistGalleries(this.artist._id)
    .then( galleries => {
      this.galleries = galleries;
    });
  };
}
