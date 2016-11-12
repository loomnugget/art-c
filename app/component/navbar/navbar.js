'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('init navbarCtrl');

  this.checkPath = function(){
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = true;

      authService.getToken()
      .then(() => {
        $location.url('/home');
      });
    }

    if (path !== '/join'){
      this.hideButtons = false;
      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function(){
    $log.log('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };
}
