'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController ];

function HomeController($log, $rootScope, galleryService){
  $log.debug('init homeCtrl');
  this.galleries = [];

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    // Fetching returns an array of galleries
    // Galleries is set as a property on the home controller
    .then( galleries => {
      this.galleries = galleries;
      // The current gallery is the first one in the index
      // In the html, the current gallery is passed into
      // The thumbnail-container gallery attribute
      this.currentGallery = galleries[0];
      $log.log('Succesfully found gallery');
    });
  };

//if you pass in function(gallery, unicorn) --> object would have another property
  this.galleryDeleteDone = function(gallery){
    $log.debug('init homeCtrl.galleryDeleteDone()');
    if (this.currentGallery._id == gallery._id) {
      // If the current gallery matches the galleryid, it is set to null
      this.currentGallery = null;
    }
  };

  // When page is loaded (controller gets created), call fetchGalleries
  this.fetchGalleries();

  // Any time url changes (locationChangeSuccess), call fetchGalleries
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchGalleries();
  });

}
