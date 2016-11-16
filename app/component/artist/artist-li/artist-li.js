'use strict';

require('./_artist-li.scss');

module.exports = {
  template: require('./artist-li.html'),
  controller: ['$log', 'artistService',  ArtistLIController],
  controllerAs: 'artistLICtrl',
  bindings: {
    artist: '<',
  },
};

function ArtistLIController($log, artistService){
  $log.debug('init artistLICtrl');

  this.showArtists = function(){
    artistService.fetchArtists();
    $log.log('Artists fetched');
  };
}
