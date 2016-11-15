'use strict';

describe('testing authservice', function() {

  beforeEach(() => {
    angular.mock.module('app');
    angular.mock.inject((authService, $window, $rootScope, $httpBackend) => {

      this.authService = authService;
      authService.setToken('Higgity Piggity');

      this.$window = $window;
      this.$rootScope = $rootScope;
      this.$httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    this.authService.token = null;
    this.$window.localStorage.clear();
  });

  describe('#getToken()', () => {
    it('should return token', () => {

      this.authService.token = 'Dibble the Wibble';

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('Dibble the Wibble');
      });

      this.$rootScope.$apply();
    });
  });

  describe('#setToken()', () => {
    it('should set a token', () => {

      this.authService.setToken('Fibbity Bibbity')
      .then(token => {
        expect(token).toEqual('Fibbity Bibbity');
      });

      this.$rootScope.$apply();
    });
  });

});
