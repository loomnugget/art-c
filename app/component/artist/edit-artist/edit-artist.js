'use strict';

module.exports = {
  template: require('./edit-artist.html'),
  controller: ['$log', 'artistService', EditArtistController],
  controllerAs: 'editArtistCtrl',
  bindings: {
    artist: '<',
  },
};

function EditArtistController($log, artistService){
  $log.debug('init editArtistCtrl');
}
