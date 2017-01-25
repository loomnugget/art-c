'use strict';

require('./_create-artist.scss');

module.exports = {
  template: require('./create-artist.html'),
  controller: ['$log', 'artistService', CreateArtistController],
  controllerAs: 'createArtistCtrl',
  bindings: {
    submission: '&',
  },
};

function CreateArtistController($log, artistService){
  $log.debug('init createArtistCtrl');

  this.artist = {};

  this.createArtist = function(){
    $log.debug('this.createArtist');
    artistService.createArtist(this.artist)
    .then( artist => {
      this.artist = artist;
      this.success = true;
      this.submission({
        artistData: this.artist,
      });
    });
  };

  this.fetchArtistData = function(){
    artistService.fetchArtist(this.artist._id);
  };
}
