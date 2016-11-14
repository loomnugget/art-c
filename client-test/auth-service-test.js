'use strict';

describe('testing authservice', function() {

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject((authService, $q, $window, $rootScope, $httpBackend) => {

      this.authService = authService;
      this.$q = $q;
      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  describe('#getToken() ', () => {
    it('should return token', () => {

      this.authService.token = null;
      this.$window.localStorage.setItem('token', 'Dibbles the Tribble');

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('Dibbles the Wibble');
      });

      this.$rootScope.$apply();
    });
  });

});
