'use strict';

describe('testing create-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope, $httpBackend, authService) => {
      authService.setToken('secret');

      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.logout();
  });

  describe('testing #createGallery()', () => {
    it('should return a created gallery', () => {

      let url = 'http://localhost:3000/api/gallery';

      let headers = {
        Authorization: 'Bearer secret',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };

      // Make a POST request to the server
      this.$httpBackend.expectPOST(url, galleryData, headers)
      .respond(200);

      // Create an instance of the createGalleryCtrl
      let createGalleryCtrl = this.$componentController('createGallery', null);

      // this.gallery in the component is set to {}
      // We pass it galleryData representing a created gallery
      createGalleryCtrl.gallery = galleryData;

      // Call createGallery on instance of controller
      createGalleryCtrl.createGallery();

      // Flush the backend
      this.$httpBackend.flush();

      // Make sure that the name and desc are set to null after a gallery has been created
      expect(createGalleryCtrl.gallery.name).toEqual(null);
      expect(createGalleryCtrl.gallery.desc).toEqual(null);

      this.$rootScope.$apply();
    });
  });

}); // end first describe block
