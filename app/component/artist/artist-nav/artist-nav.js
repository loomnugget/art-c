'use strict';

require('./_artist-nav.scss');

module.exports = {
  template: require('./artist-nav.html'),
  controller: ['$log', '$location', artistNavController],
  controllerAs: 'artistNavCtrl',
};

function artistNavController($log, $location) {
  $log.debug('init artistNavCtrl');

  this.viewGallery = function(){
    $log.log('navbarCtrl.viewGallery()');
    $location.url('/gallery');
  };

  this.updateProfile = function(){
    $log.log('navbarCtrl.updateProfile()');
    $location.url('/profile');
  };

}
