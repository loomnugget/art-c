'use strict';

module.exports = ['$log', HomeController];

function HomeController($log){
  $log.debug('init homeCtrl');
  this.title = 'You are logged in';
}
