'use strict';

require('./_artist-info.scss');

module.exports = {
  template: require('./artist-info.html'),
  controllerAs: 'artistInfoCtrl',
  controller: ['$log', '$location', 'artistService', ArtistInfoController],
  bindings: {
    artist: '<',
  },
};

function ArtistInfoController($log, $location, artistService){
  $log.debug('init artistInfoCtrl');

  this.showEditArtist = false;

  this.handleEditArtist = function(){
    this.showEditArtist = false;
  };

  this.deleteArtist = function(){
    artistService.deleteArtist(this.artist)
    .then(() => {
      $location.url('/home');
    });
  };
}
