'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', 'authService', LandingController];

function LandingController($log, $location, $rootScope, authService){
  $log.debug('init landingCtrl');

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === '/join';

  let query = $location.search();

  if(query.token){
    authService.setToken(query.token)
    .then(() => {
      $location.path('/#/home');
    });
  }

  $rootScope.$on('locationChangeSuccess', () => {
    let query = $location.search();
    console.log('query', query);
    if(query.token){
      authService.setToken(query.token)
      .then(() => {
        $location.path('/#/home');
      });
    }
  });

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectURI = 'redirect_uri=http://localhost:3000/api/auth/oauth_callback';
  let googleAuthAccessType = 'access_type=offline';
  let googleAuthPrompt = 'prompt=consent';

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`;


}
