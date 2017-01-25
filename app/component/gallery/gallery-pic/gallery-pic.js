'use strict';

module.exports = {
  template: require('./gallery-pic.html'),
  controller: ['$log', '$location', '$window', 'picService', GalleryPicController],
  controllerAs: 'galleryPicCtrl',
  bindings: {
    gallery: '<',
  },
};

function GalleryPicController($log, $location, $window, picService) {
  $log.debug('init galleryPicCtrl');

  this.defaultPic = require('../../../scss/images/default-thumbnail.jpg');


  this.reloadRoute = function(){
    $window.location.reload();
  };

  this.uploadGalleryPic = function(){
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then(pic => {
      this.gallery.photoID = pic;
    });
  };
}
