'use strict';

require('./_home-gallery-li.scss');

module.exports = {
  template: require('./home-gallery-li.html'),
  controller: ['$log', HomeGalleryLIController],
  controllerAs: 'homeGalleryLICtrl',
  bindings: {
    gallery: '<',
  },
};

function HomeGalleryLIController($log){
  $log.debug('init homeGalleryLICtrl');
}
