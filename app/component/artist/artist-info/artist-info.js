'use strict';

require('./_artist-info.scss');

module.exports = {
  template: require('./artist-info.html'),
  controllerAs: 'artistInfoCtrl',
  controller: ['$log', '$location', '$uibModal', ArtistInfoController],
  bindings: {
    artist: '<',
    deleteToggle: '&',
  },
};

function ArtistInfoController($log, $location, $uibModal){
  $log.debug('init artistInfoCtrl');

  this.showEditArtist = false;

  this.handleEditArtist = function(){
    this.showEditArtist = false;
  };

  this.open = function(artist) {
    let modalInstance = $uibModal.open({
      component: 'delete-modal',
      resolve: {
        deleteToggle: function(){
          return artist;
        },
      },
    });

    return modalInstance;
  };
}
