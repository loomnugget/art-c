'use strict';

require('./_delete-modal.scss');

module.exports = {
  template: require('./delete-modal.html'),
  controller: ['$log', '$location', 'artistService', DeleteModalController],
  controllerAs: 'deleteModalCtrl',
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
};

function DeleteModalController($log, $location, artistService){
  $log.debug('init modalCtrl');
  this.modalData = this.resolve.deleteToggle;

  this.deleteArtist = function(){
    artistService.deleteArtist(this.modalData)
    .then(() => {
      this.modalInstance.close();
      $location.url('/home');
    });
  };
}
