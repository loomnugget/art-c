'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', '$location', 'galleryService',  GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    deleteCheck: '&',
  },
};

function GalleryLIController($log, $location, galleryService){
  $log.debug('init galleryLICtrl');

  this.showEditGallery = false;
  this.homeView = false;

  this.isHomeView = function(){
    if ($location.url() === '/home'){
      this.homeView = true;
    }
  };

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id, this.gallery.artistID)
    .then(() => {
      this.deleteCheck({gallery: this.gallery});
    });
  };

}
