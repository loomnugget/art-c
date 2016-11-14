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
      this.hideLogoutButton = true;
      this.hideLoginSignupButtons = false;

      authService.getToken()
      .then(() => {
        $location.url('/home');
      });
    }

    if (path !== '/join'){
      this.hideLogoutButton = false;

      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      });
    }

    if (path === '/home') {
      this.hideLoginSignupButtons = true;
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function(){
    $log.log('navbarCtrl.logout()');
    this.hideLogoutButton = true;
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };

  this.signup = function(){
    $log.log('navbarCtrl.signup()');
    this.hideLoginSignupButtons = true;
    // bring up modal
  };

  this.login = function(){
    $log.log('navbarCtrl.login()');
    this.hideLoginSignupButtons = true;
    // bring up modal
  };

}
