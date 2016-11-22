'use strict';

module.exports = {
  template: require('./edit-artist.html'),
  controller: ['$log', 'artistService', EditArtistController],
  controllerAs: 'editArtistCtrl',
  bindings: {
    artist: '<',
    onUpdate: '&',
  },
};

function EditArtistController($log, artistService){
  $log.debug('init editArtistCtrl');

  this.updateArtist = function(){
    artistService.updateArtist(this.artist)
    .then(() => {
      this.onUpdate();
    });
  };
}
