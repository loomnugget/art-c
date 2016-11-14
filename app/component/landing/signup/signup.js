'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService){
  this.signup = function(user){
    // calls authService.signup- if suceds redirect to homeview
    authService.signup(user)
    .then(() => {
      $location.path('/home');
    })
    .catch(() => {
      console.log('Signup Failed');
    });
  };
}
