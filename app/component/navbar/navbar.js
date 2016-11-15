'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', '$window', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavbarController($log, $location, $rootScope, $window, authService) {
  $log.debug('init navbarCtrl');
  console.log('sgtuffwhatoefioweaf');

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
        $location.url('/ho');
      })
      .catch(() => {
        let query = $location.search();
        if (query.token) {
          console.log('Got token', query.token);
          authService.setToken(query.token)
            .then(() => {
              $location.url('/home');
            });
        }
      });
  }

  $window.onload = pageLoadHandler;
  $rootScope.$on('locationChangeSuccess', pageLoadHandler);

  this.logout = function() {
    $log.log('navbarCtrl.logout()');
    this.hideLogoutButton = true;
    authService.logout()
      .then(() => {
        $location.url('/');
      });
  };
  //
  // this.signup = function() {
  //   $log.log('navbarCtrl.signup()');
  //   this.hideLoginSignupButtons = true;
  //   // bring up modal
  // };
  //
  // this.login = function() {
  //   $log.log('navbarCtrl.login()');
  //   this.hideLoginSignupButtons = true;
  //   // bring up modal
  // };

}
