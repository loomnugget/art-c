'use strict';

require('./_create-artist.scss');

module.exports = {
  template: require('./create-artist.html'),
  controller: ['$log', 'artistService', CreateArtistController],
  controllerAs: 'createArtistCtrl',
};

function CreateArtistController($log, artistService){
  $log.debug('init createArtistCtrl');

  this.artist = {};

  this.createArtist = function(){
    artistService.createArtist(this.artist);
  };

}
