'use strict';

require('./_create-gallery.scss');

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
};

function CreateGalleryController($log, galleryService){
  $log.debug('init createGalleryCtrl');
  this.gallery = {};
 // method that passes in current gallery object when called from view
  this.createGallery = function(){
    
    galleryService.createGallery(this.gallery)
    .then(() => {
      // on success, nulls out inputs so it doesn't repeat the old data
      // ng-model is using it, so they stay in there
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
}
