'use strict';

require('./_artist-info.scss');

module.exports = {
  template: require('./artist-info.html'),
  controllerAs: 'artistInfoCtrl',
  controller: ['$log', ArtistInfoController],
  bindings: {
    artist: '<',
  },
};

function ArtistInfoController($log){
  $log.debug('init artistInfoCtrl');
}
