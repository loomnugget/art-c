'use strict';

describe('testing edit-gallery controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope, $httpBackend, authService) => {
      authService.setToken('1234');

      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });
  afterEach(() => {
    // calling logout removes token from local storage!
    this.authService.logout();
  });

  it('testing component bindings', () => {
    // Set up object to be passed in
    let mockBindings = {
      gallery: {
        name: 'goose',
        desc: 'lary',
      },
    };

    // Mock the gallery and pass in name of component
    // Second argument is set if we want to override locals
    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual('goose');
    expect(editGalleryCtrl.gallery.desc).toEqual('lary');

    this.$rootScope.$apply();
  });

  describe('testing #updateGallery', () => {

    it('should make a valid PUT request', () => {

      let url = 'http://localhost:3000/api/gallery/12345';
      // Mock headers
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      // Mock PUT request to server
      // Can put expectPUT any where before you call flush
      // Backend has to be registered before you make the request
      this.$httpBackend.expectPUT(url, {_id: '12345', name: 'newname', desc: 'lary'}, headers)
      // expect server to respond with a 200 status code
      .respond(200);

      // Mock object to be passed in via bindings
      let mockBindings = {
        gallery: {
          _id: '12345',
          name: 'goose',
          desc: 'lary',
        },
      };

      // Mock component - create an instance of component with the mocked bindings
      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      // Mock updated name
      editGalleryCtrl.gallery.name = 'newname';
      // Call updateGallery() on instance of editGalleryCtrl-
      editGalleryCtrl.updateGallery();
      // Flush the backend - tells httpBackend to respond to the request
      this.$httpBackend.flush();
      this.$rootScope.$apply(); //
    });
  });
});
