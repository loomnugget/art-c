'use strict';

require('./_artist-pic.scss');

module.exports = {
  template: require('./artist-pic.html'),
  controller: ['$log', '$location', '$window', 'picService', ArtistPicController],
  controllerAs: 'artistPicCtrl',
  bindings: {
    artist: '<',
  },
};

function ArtistPicController($log, $location, $window, picService) {
  $log.debug('init profilePicCtrl');

  this.defaultPic = require('../../../scss/images/default-profile.jpg');
  this.pic = {},
  this.done = function(){
    $log.log('WORKING');
    this.reloadRoute();
    this.pic.file = null;
  };

  this.reloadRoute = function(){
    $window.location.reload();
  };

  this.uploadArtistPic = function(){
    picService.uploadArtistPic(this.artist, this.pic)
    .then(() => {
      this.done();
    });
  };
}
