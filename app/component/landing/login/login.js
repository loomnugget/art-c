'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService){
  $log.debug('init loginCtrl');
  // login method on loginCtrl
  this.login = function(){
    $log.log('loginCtrl.login()');
    // calls authService.login given current user
    authService.login(this.user)
    .then(() => {
      $location.url('/home');
    });
  };
}
