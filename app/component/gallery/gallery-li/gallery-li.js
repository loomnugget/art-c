'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', 'galleryService',  GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    deleteCheck: '&',
  },
};

function GalleryLIController($log, galleryService){
  $log.debug('init galleryLICtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id, this.gallery.artistID)
    .then(() => {
      this.deleteCheck({gallery: this.gallery});
    });
  };

}
