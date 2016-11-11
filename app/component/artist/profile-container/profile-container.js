'use strict';

require('./_profile-container.scss');

// Takes in a pic and a artist via one way data binding
// Bindings define the attributes 'pic' and 'artist' in the html
// Assigns 'pic' and 'artist' on the scope of the profile-container - objects can be passed in

module.exports = {
  template: require('./profile-container.html'),
  controller: ['$log', 'picService', ProfileContainerController],
  controllerAs: 'profileContainerCtrl',
  bindings: {
    pic: '<',
    artist: '<',
  },
};

function ProfileContainerController($log, picService) {
  
  $log.debug('init profileContainerCtrl');

  this.deletePic = function() {
    $log.debug('profileContainerCtrl.deletePic');
    picService.deleteArtistPic(this.artist, this.pic._id);
  };
}
