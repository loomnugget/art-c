'use strict';

module.exports = ['$log', '$rootScope', '$window', '$location', 'authService', HomeController];

function HomeController($log, $rootScope, $window, $location, authService) {
  $log.debug('init homeCtrl');

  function pageLoadHandler() {
    authService.getToken()
    .then( token => {
      console.log('token', token);
      $location.url('/home');
    })
    .catch( () => {
      let query = $location.search();
      if (query.token) {
        console.log('Got token', query.token);
        authService.setToken(query.token)
        .then( () => {
          $location.url('/home');
        });
      }
    });
  }

  $window.onload = pageLoadHandler;

  $rootScope.$on('locationChangeSuccess', pageLoadHandler);

  this.facebookAuthURL = '';

  let facebookAuthBase = 'https://www.facebook.com/v2.8/dialog/oauth';
  let facebookClientID = `client_id=${__FACEBOOK_CLIENT_ID__}`;
  let facebookRedirectURI = `redirect_uri=${__API_URL__}/api/auth/facebook_oauth_callback`;
  let facebookResponseType = 'response_type=code';
  let facebookAuthScope = 'scope=public_profile%20email';

  this.facebookAuthURL = `${facebookAuthBase}?${facebookClientID}&${facebookRedirectURI}&${facebookResponseType}&${facebookAuthScope}`;
}
