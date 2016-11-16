'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', '$window', '$uibModal', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
    resolve: '<',
    loginToggle: '<',
  },
};

function NavbarController($log, $location, $rootScope, $window, $uibModal, authService) {
  $log.debug('init navbarCtrl');

  function pageLoadHandler() {
    let path = $location.path();
    if (path === '/landing') {
      this.hideLogoutButton = true;
      this.hideLoginSignupButtons = false;
    }

    if (path !== '/landing') {
      this.hideLoginSignupButtons = true;
      this.hideLogoutButton = false;
    }

    authService.getToken()
      .then(token => {
        console.log('token', token);
        $location.url('/home');
      })
      .catch(() => {
        let query = $location.search();
        if (query.token) {
          authService.setToken(query.token)
            .then(() => {
              $location.url('/home');
            });
        }
      });
  }

  $window.onload = pageLoadHandler.bind(this);
  $rootScope.$on('locationChangeSuccess', pageLoadHandler.bind(this));

  this.logout = function() {
    $log.log('navbarCtrl.logout()');
    authService.logout()
      .then(() => {
        $location.url('/');
        this.hideLogoutButton = true;
      });
  };

  this.googleAuthURL = '';

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';

  let googleAuthRedirectURI = `redirect_uri=${__API_URL__}/api/auth/oauth_callback`;
  let googleAuthAccessType = 'access_type=offline';

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&prompt=consent`;

  if (!__DEBUG__) {
    this.googleAuthURL += '&prompt=consent';
  }

  this.facebookAuthURL = '';

  let facebookAuthBase = 'https://www.facebook.com/v2.8/dialog/oauth';
  let facebookClientID = `client_id=${__FACEBOOK_CLIENT_ID__}`;
  let facebookRedirectURI = `redirect_uri=${__API_URL__}/api/auth/facebook_oauth_callback`;
  let facebookResponseType = 'response_type=code';
  let facebookAuthScope = 'scope=public_profile%20email';

  this.facebookAuthURL = `${facebookAuthBase}?${facebookClientID}&${facebookRedirectURI}&${facebookResponseType}&${facebookAuthScope}`;

  this.open = function(toggleLogin) {
    let modalInstance = $uibModal.open({
      component: 'modal',
      resolve: {
        loginToggle: function(){
          return toggleLogin;
        },
      },
    });

    return modalInstance;
  };


}
