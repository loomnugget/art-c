'use strict';

require('./_artist-li.scss');

module.exports = {
  template: require('./artist-li.html'),
  controller: ['$log', ArtistLIController],
  controllerAs: 'artistLICtrl',
  bindings: {
    artist: '<',
  },
};

function ArtistLIController($log){
  $log.debug('init artistLICtrl');
}
