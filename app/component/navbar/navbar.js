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

  this.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };


  function pageLoadHandler() {

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

  this.artistSignup = function(){
    $log.log('navbarCtrl.artistSignup()');
    $location.url('/artist');
  };

  this.logout = function() {
    $log.log('navbarCtrl.logout()');
  //  this.hideLogoutButton = true;
    authService.logout()
      .then(() => {
        $location.url('/');
      });
  };

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
