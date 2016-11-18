'use strict';

require('./_gallery-pic.scss');

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
  this.pic = {};
  this.done = function(){
    $log.log('WORKING');
    this.reloadRoute();
    this.pic.file = null;
  };

  this.reloadRoute = function(){
    $window.location.reload();
  };

  this.uploadGalleryPic = function(){
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then(() => {
      this.done();
    });
  };
}
