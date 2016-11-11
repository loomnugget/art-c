'use strict';

// Testing if the front-end makes the correct requests to the back-end
// beforeEach that mocks the demoApp module and services
// First we mock the demoApp to get access to services
// Angular is a global, so it doesn't have to be required in (set in the .eslintrc file)
// Mock is loaded in karma config - inject is a method that can inject services
// We need to mock a token for requests to work
// We meed to mock a gallery service and back end
// Want the tests to run independently of backend
// $httpBackend - our backend has to be turned off for this to work
// expectGET(POST...)(url, [headers], [keys])
// Expect each request to respond with expected content and headers

describe('testing galleryService', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, galleryService, $httpBackend, $window, $rootScope) => {
      this.authService = authService;
      authService.setToken('1234');
      this.galleryService = galleryService;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
      this.$rootScope = $rootScope;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing galleryService.createGallery()', () => {
    it('should return a gallery', () => {

      // Mocking the data and headers
      // When the backend makes a request, it should have this data
      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };
      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      // Mock the server route
      // Expect that a POST request is made to the expected url with expected data and headers
      this.$httpBackend.expectPOST('http://localhost:3000/api/gallery', galleryData, headers)

      // We are testing if the server responds with the correct information
      // This is what the backend would actually send you
      .respond(200, {_id:'5678', username:'loom', name: galleryData.name, desc: galleryData.desc, pics: []});

      // Make the request to the backend
      this.galleryService.createGallery(galleryData);
      // Flush the backend
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.deleteGallery(galleryID)', () => {
    it('should succeed in deleting gallery', () => {
      // 1. mock the request
      let galleryID = 'helloworld';
      let headers = {
        // delete route has no content type
        Authorization: 'Bearer 1234', //only testing if they send us a token
        Accept: 'application/json, text/plain, */*',
      };

      // 2. mock server route - use gallery/helloworld because that is the test ID we set
      this.$httpBackend.expectDELETE('http://localhost:3000/api/gallery/helloworld', headers)
      .respond(204);

      // 3. make request to the server
      this.galleryService.deleteGallery(galleryID);

      // 4. flush the server mock
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });

  describe('testing galleryService.fetchGalleries()', () => {
    it('should return galleries', () => {

      // 1. Mock the request
      let galleries = [
        {
          name: 'gal1',
          desc: 'yay',
        },
        {
          name: 'gal2',
          desc: 'yay2',
        },
      ];

      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };
      // 2. Mock server route
      this.$httpBackend.expectGET('http://localhost:3000/api/gallery/?sort=desc', headers)

      .respond(200, galleries);

      // 3. Make request
      this.galleryService.fetchGalleries()
      .then( galleries => {
        expect(galleries.length).toEqual(2);
        expect(galleries[0].name).toBe('gal1');
      });
      // 4. Flush the server mock
      this.$httpBackend.flush();
    });
  });

  describe('testing galleryService.updateGallery(galleryData, galleryID)', () => {
    it('should return updated gallery', () => {
      let url = 'http://localhost:3000/api/gallery/helloworld';
      // 1. Mock the request
      let galleryData = {
        name: 'exampleGallery',
        desc: 'stuff',
      };

      let galleryID = 'helloworld';

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      // 2. Mock server route
      this.$httpBackend.expectPUT(url,  {name: 'exampleGallery', desc: 'stuff'}, headers)
      .respond(200);

      // 3. Make request
      this.galleryService.updateGallery(galleryData, galleryID);
      // 4. Flush the server mock
      this.$httpBackend.flush();
    });
  });

}); // end first describe block
