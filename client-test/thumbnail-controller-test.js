'use strict';

describe('testing thumbnail controller', function(){

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
    this.authService.logout();
  });


  it('testing component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'goose',
        desc: 'lary',
      },
      pic: {
        name: 'picture',
        desc: 'tasty',
      },
    };
    let thumbnailCtrl = this.$componentController('thumbnail', null, mockBindings);
    expect(thumbnailCtrl.gallery.name).toEqual('goose');
    expect(thumbnailCtrl.gallery.desc).toEqual('lary');
    expect(thumbnailCtrl.pic.name).toEqual('picture');
    expect(thumbnailCtrl.pic.desc).toEqual('tasty');
    this.$rootScope.$apply();
  });


  // describe('testing #deleteGallery', () => {
  //
  //   it('should make a valid DELETE request', () => {
  //
  //     let url = 'http://localhost:3000/api/pic/12345';
  //     let headers = {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer 1234',
  //     };
  //
  //     // Mock server route
  //     this.$httpBackend.expectDELETE(url, headers).respond(204);
  //
  //     let mockBindings = {
  //       gallery: {
  //         _id: 1234,
  //         name: 'goose',
  //         desc: 'lary',
  //       },
  //       pic: {
  //         _id: 12345,
  //         name: 'picture',
  //         desc: 'tasty',
  //       },
  //     };
  //
  //     let thumbnailCtrl = this.$componentController('thumbnail', null, mockBindings);
  //     thumbnailCtrl.deletePic();
  //
  //     this.$httpBackend.flush();
  //     this.$rootScope.$apply();
  //   });
  // });
});
