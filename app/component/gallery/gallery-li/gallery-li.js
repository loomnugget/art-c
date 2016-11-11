'use strict';

require('./_gallery-li.scss');

module.exports = {
  template: require('./gallery-li.html'),
  controller: ['$log', 'galleryService',  GalleryLIController],
  controllerAs: 'galleryLICtrl',
  bindings: {
    gallery: '<',
    deleteDone: '&',
  },
};

function GalleryLIController($log, galleryService){
  $log.debug('init galleryLICtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
  //  console.log('galleryservice.deleteGallery');
  //  console.log('galleryid', this.gallery._id);
    galleryService.deleteGallery(this.gallery._id)
    .then(() => {
      this.deleteDone({galleryData: this.gallery});
    });
  };
}

// the Template filename creates <gallery-li> </gallery-li>
// Bindings allow objects and functions to be passed through scopes in html
// & - passing in a function - allows us to pass from child scope to parent scope
// < - passing in an object - pass in from parent to child

// GalleryLIController
// The edit gallery is not shown unless button is clicked
// DeleteGallery is called when button is clicked - delete done is passed in in the template for home ctr;
// when gal is sucessfully deleted, it calls delete done
// Object is passed in deleteDone to map named parameters in function call
// this.deleteDone - function added to the scope via binding
// & - attributes are always named properties on an object
// & creates the 'gallery' attribute used to pass a gallery in in the html
