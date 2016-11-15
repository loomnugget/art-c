'use strict';

describe('testing authService', function() {

  let url = 'http://localhost:3000/api';

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

  describe('#signup(user)', () => {
    it('should return a token', () => {

      let user = {
        username: 'Harold',
        email: 'harold@herald.com',
        password: '123456',
      };

      this.$httpBackend.expectPOST(`${url}/signup`, user)
      .respond(200, 'responseToken');

      this.authService.signup(user)
      .then(token => {
        expect(token).toBe('responseToken');
      })
      .catch(err => {
        expect(err).toBe(null);
      });

      this.$httpBackend.flush();
    });
  });

});
