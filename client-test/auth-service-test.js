'use strict';

describe('testing authService', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject((authService, $httpBackend, $q, $window, $rootScope) => {
      this.authService = authService;
      authService.setToken('1234');
      this.$httpBackend = $httpBackend;
      this.$q = $q;
      this.$window = $window;
      this.$rootScope = $rootScope;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing authService.setToken()', () => {
    it('should return a token', () => {
      this.authService.token = 'myspecialtoken';

      this.authService.getToken()
      .then(token => {
        expect(token).toEqual('myspecialtoken');
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing #getToken()', () => {
    it('should return a token', () => {

      this.authService.token = null;
      this.$window.localStorage.setItem('token', '1234');

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('1234');
      })
      .catch( err => {
        expect(err).toEqual(null);
      });

      this.$rootScope.$apply();
    });
  });

  describe('testing authService.login(user)', () => {
    it('should return a user', () => {

      let userData = {
        username: 'GooseMan',
        email:'bread@tasty.com',
        password: '1234567',
      };

      // Basic auth says you set a base64 endcoded header with user and password
      let base64 = this.$window.btoa(`${userData.username}:${userData.password}`);
      // we are expecting to get this as the header
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };
      this.$httpBackend.expectGET('http://localhost:3000/api/login', headers)
      // it should respond with the correct information
      // this is what the server would actually send you
      .respond(200, {_id:'5678', username: userData.username, email:userData.email});

      // make the request to the backend
      this.authService.login(userData);
      //flush the backend
      this.$httpBackend.flush();
    });
  });

  describe('testing authService.signup(user)', () => {
    it('should return a new user', () => {
      // test userData
      let userData = {
        username: 'GooseMan',
        email:'bread@tasty.com',
      };
      // Test headers
      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      this.$httpBackend.expectPOST('http://localhost:3000/api/signup', userData, headers)
      // $http needs to be flushed to mock asynchronous requests
      // It accumulates requests to the server and responds to everything at once
      .respond(200, {_id:'5678', username: userData.username, email:userData.email});

      // Make the request to the server
      this.authService.signup(userData);
      // Flush the backend
      this.$httpBackend.flush();
    });
  });

}); // end first describe block
