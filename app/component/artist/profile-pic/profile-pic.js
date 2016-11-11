'use strict';

require('./_profile-pic.scss');

module.exports = {
  template: require('./profile-pic.html'),
  controller: ['$log', 'picService', ProfilePicController],
  controllerAs: 'profilePicCtrl',
};

function ProfilePicController($log, picService) {
  $log.debug('init profilePicCtrl');
  this.pic = {},
  this.done = function(){
    this.pic.file = null;
  };

  this.uploadArtistPic = function(){
    picService.uploadArtistPic(this.artist, this.pic)
    .then(() => {
      this.done();
    });
  };
}
