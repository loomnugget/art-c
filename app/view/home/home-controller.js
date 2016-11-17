'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', 'artistService', HomeController ];

function HomeController($log, $rootScope, galleryService, artistService){
  $log.debug('init homeCtrl');

  this.title = 'You are logged in';

  this.loggedArtist;
  this.galleries = [];
  this.artists =[];

  this.checkArtistStatus = function() {
    $log.log('init checkartiststatus');
    artistService.checkArtist()
    .then( artist => {
      console.log(artist, 'ARTIST');
      this.loggedArtist = artist;
    })
    .catch( () => {
      this.artist = null;
    });
  };

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    .then( galleries => {
      this.galleries = galleries;
      this.currentGallery = galleries[0];
      $log.log('Succesfully found gallery');
    });
  };

  this.fetchArtists = function(){
    artistService.fetchArtists()
    .then( artists => {
      this.artists = artists;
      this.currentArtist = artists[0];
      $log.log('Succesfully found artist');
    });
  };
  // When page is loaded (controller gets created), call fetchGalleries and fetchArtists
  this.fetchGalleries();
  this.fetchArtists();
  this.checkArtistStatus();

  // Any time url changes (locationChangeSuccess), call fetchGalleries and fetchArtists
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
    this.fetchArtists();
    this.checkArtistStatus();
  });

}
