'use strict';

describe('testing navbarCtrl', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $httpBackend, $q, $window, $rootScope) => {
      authService.setToken('1234');

      this.authService = authService;
      this.$httpBackend = $httpBackend;
      this.$q = $q;
      this.$window = $window;
      this.$rootScope = $rootScope;
    });
  });




}); // end testing navbarCtrl
