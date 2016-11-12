'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService){
  $log.debug('init loginCtrl');
  this.login = function(){
    $log.log('loginCtrl.login()');
    authService.login(this.user)
    .then(() => {
      $location.url('/home');
    });
  };
}
