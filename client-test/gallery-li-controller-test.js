'use strict';

describe('testing gallery-li controller', function(){

  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject(($componentController, $rootScope, $httpBackend, authService) => {
      // Need to mock a token because galleryService requires authorization to make a request
      authService.setToken('secret');
      this.$componentController = $componentController;
      this.$rootScope = $rootScope;
      this.authService = authService;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach( () => {
    // If there was a request statement that nobody makes a request to, throw an error
    this.$httpBackend.verifyNoOutstandingExpectation();
    // For when statements
    this.$httpBackend.verifyNoOutstandingRequest();
  });

  afterEach(() => {
    // Clear the token after every test
    this.authService.logout();
  });

  describe('testing #deleteDone()', () => {
    it('should call deleteDone', () => {
      // mock bindings
      let mockBindings = {
        gallery: {
          _id: '65432ONE',
          name: 'Lary',
          desc: 'day in the park with lary',
          pics: [],
        },
        // function mimics the one we are passing into deleteDone();
        // & requires a function to be passed through attribute
        // they keys line up to what is passed in on the template
        deleteDone: function(data){
          expect(data.galleryData._id).toEqual('65432ONE');
        },
      };

      let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
      // object passed in should match what is in the home controller
      galleryLICtrl.deleteDone({galleryData: galleryLICtrl.gallery});

      this.$rootScope.$apply();
    });

    it('should call deleteDone with gallery after galleryDelete', () => {

      let url = 'http://localhost:3000/api/gallery/1234567';
      // Mock headers
      let headers = {
        Authorization: 'Bearer secret',
        Accept: 'application/json, text/plain, */*',
      };

      // set up object to be passed in
      let mockBindings = {
        gallery: {
          _id: '1234567',
          name: 'goose',
          desc: 'lary',
          pics: [],
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual(mockBindings.gallery._id);
        },
      };

      this.$httpBackend.expectDELETE(url, headers).respond(204);

      let galleryLICtrl = this.$componentController('galleryLi', null, mockBindings);
      galleryLICtrl.deleteGallery(); //deleteGallery calls deleteDone()

      // Flush the backend
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

}); // end first describe block
