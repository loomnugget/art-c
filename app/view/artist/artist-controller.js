'use strict';

require('./_artist.scss');

module.exports = ['$log', '$location', '$rootScope', 'galleryService', 'artistService', ArtistController];

function ArtistController($log, $location, $rootScope, galleryService, artistService){
  $log.log('init artistCtrl');

  this.galleries = [];
  this.listings = [];
  this.artist;

  this.isVisible = false;

  this.showArtistInfo = function() {
    this.isVisible = true;
  };

  this.fetchArtistGalleries = function() {
    console.log(this.artist, 'THIS.ARTIST');
    galleryService.fetchArtistGalleries(this.artist._id)
    .then( galleries => {
      console.log('GALLERIES IN ARTISTCTRL', galleries);
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
    .then(() => {
      this.fetchArtistGalleries(this.artist._id);
    // })
    // .then(galleries => {
    //   this.galleries = galleries;
    })
    .catch( () => {
      this.artist = null;
    });
  };

  this.artistFormSubmission = function(){
    $log.debug('artistCtrl.artistFormSubmission');
    this.checkArtistStatus();
  };

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkArtistStatus();
    this.fetchArtistGalleries();
  });

  // this.fetchArtistGalleries();
  this.checkArtistStatus();
}
