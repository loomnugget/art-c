'use strict';

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
  bindings: {
    artist: '<',
  },
};

function CreateGalleryController($log, galleryService){
  $log.debug('init createGalleryCtrl');

  this.createGallery = function(){
    galleryService.createGallery(this.artist._id, this.gallery)
    .then(() => {
      this.gallery.name = null;
      this.gallery.desc = null;
      this.gallery.category = null;
      this.gallery.created = null;
    });
  };
}
