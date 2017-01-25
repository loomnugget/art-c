'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', '$location', 'galleryService', 'picService',  GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    deleteCheck: '&',
  },
};

function GalleryLIController($log, $location, galleryService, picService){
  $log.debug('init galleryLICtrl');

  this.showEditGallery = false;
  this.homeView = false;

  this.isHomeView = function(){
    if ($location.url() === '/home'){
      this.homeView = true;
    }
    if ($location.url() === '/artist'){
      this.homeView = false;
    }
  };

  this.isHomeView();

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id, this.gallery.artistID)
    .then(() => {
      this.deleteCheck({gallery: this.gallery});
    });
  };

  this.uploadGalleryPic = function(){
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then(pic => {
      this.gallery.photoID = pic;
    });
  };

}
