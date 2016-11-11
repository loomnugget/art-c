'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    // @ allows us to pass name in through attribute - string or boolean
    appTitle: '@', // appTitle is a property that gets set on the controllers
  },
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('init navbarCtrl');

  // Nav logic specific to $location.path()
  // If path is /join, hides buttons
  this.checkPath = function(){
    let path = $location.path();
    if (path === '/join'){
      this.hideButtons = true;

    // If there is a token, redirect to the home page
      authService.getToken()
      .then(() => {
        $location.url('/home');
      });
    }

  // If not /join, check if there is a token, if not, go back to the join page
    if (path !== '/join'){
      this.hideButtons = false; // buttons are un-hidden
      authService.getToken()
      .catch(() => {
        $location.url('/join#login');
      });
    }
  };

  // On pageload, call this.checkPath()
  // Run on pageload, as soon as navbar is instantiated
  this.checkPath();

  // On page success page change call this.checkPath()
  // Every time url is modified, or anchortag, runs checkPath
  // $locationChangeSuccess is an event built into the root scope
  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

// on logout, redirects to /, which we configured to take you back to join
  this.logout = function(){
    $log.log('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };
}
