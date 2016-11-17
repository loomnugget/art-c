'use strict';

require('./_artist.scss');

module.exports = ['$log', '$location', '$rootScope', 'galleryService', 'artistService', ArtistController];

function ArtistController($log, $location, $rootScope, galleryService, artistService){
  $log.log('init artistCtrl');

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
      console.log(artist, 'ARTIST');
      this.artist = artist;
    })
    .catch( () => {
      this.artist = null;
    });
  };

  this.artistFormSubmission = function(){
    $log.debug('artistCtrl.artistFormSubmission');
    this.checkArtistStatus();
    // if(this.artist.firstname === artist.firstname){
    //   this.checkArtistStatus();
    // }
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkArtistStatus();
  });

  this.checkArtistStatus();
}
