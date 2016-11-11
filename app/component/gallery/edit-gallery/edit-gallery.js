'use strict';

require('./_edit-gallery.scss');

module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService',  EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    // one way data binding
    gallery: '<',
  },
};

function EditGalleryController($log, galleryService){
  $log.debug('init editGalleryCtrl');

  this.updateGallery = function(){
    galleryService.updateGallery(this.gallery, this.gallery._id);
  };
}
