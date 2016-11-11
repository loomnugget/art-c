'use strict';

describe('testing thumbnail-container controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope) => {
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
    });
  });

  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'goose',
        desc: 'lary',
      },
    };
    let thumbnailContainerCtrl = this.$componentController('thumbnailContainer', null, mockBindings);
    // console.log('editGalleryCtrl', editGalleryCtrl);
    expect(thumbnailContainerCtrl.gallery.name).toEqual('goose');
    expect(thumbnailContainerCtrl.gallery.desc).toEqual('lary');
    this.$rootScope.$apply();
  });
});
