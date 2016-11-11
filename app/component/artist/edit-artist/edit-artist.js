'use strict';

require('./_edit-artist.scss');

module.exports = {
  template: require('./edit-artist.html'),
  controller: ['$log', 'artistService', EditArtistController],
  controllerAs: 'editArtistCtrl',
  bindings: {
    // one way data binding
    artist: '<',
  },
};

function EditArtistController($log, artistService) {
  $log.debug('init editArtistCtrl');

  this.updateArtist = function(){
    artistService.updateArtist(this.artist, this.artist._id);
  };
}
