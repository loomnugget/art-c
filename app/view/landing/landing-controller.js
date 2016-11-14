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
    if(query.token){
      authService.setToken(query.token)
      .then(() => {
        $location.path('/#/home');
      });
    }
  });
}
