'use strict';

require('./_home-gallery-li.scss');

module.exports = {
  template: require('./home-gallery-li.html'),
  controller: ['$log', 'galleryService',  HomeGalleryLIController],
  controllerAs: 'homeGalleryLICtrl',
  bindings: {
    gallery: '<',
  },
};

function HomeGalleryLIController($log, galleryService){
  $log.debug('init homeGalleryLICtrl');

  this.showGalleries = function(){
    galleryService.fetchGalleries();
    $log.log('Galleries fetched');
  };
}
