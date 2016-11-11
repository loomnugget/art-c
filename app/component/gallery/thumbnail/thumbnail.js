'use strict';

require('./_thumbnail.scss');

// Takes in a pic and a gallery via one way data binding
// Bindings define the attributes 'pic' and 'gallery' in the html
// Assigns 'pic' and 'gallery' on the scope of the thumbnail-container - objects can be passed in

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<',
    gallery: '<',
  },
};

function ThumbnailController($log, picService) {
  $log.debug('init thumbnailCtrl');
  this.deletePic = function() {
    $log.debug('thumbnailCtrl.deletePic');
    // pass in the current gallery and pic id to deleteGalleryPic
    picService.deleteGalleryPic(this.gallery, this.pic._id);
  };
}
