'use strict';

require('./_thumbnail-container.scss');

module.exports = {
  template: require('./thumbnail-container.html'),
  controllerAs: 'thumbnailContainerCtrl',
  // Takes in a gallery via one way data binding
  // Binding defines an attribute 'gallery' in the html
  // Assigns 'gallery' on the scope of the thumbnail-conatiner
  bindings: {
    gallery: '<',
  },
};
