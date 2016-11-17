'use strict';

require('./_artist-pic.scss');

module.exports = {
  template: require('./artist-pic.html'),
  controller: ['$log', 'picService', ArtistPicController],
  controllerAs: 'profilePicCtrl',
};

function ArtistPicController($log, picService) {
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
