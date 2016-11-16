'use strict';

require('./_modal.scss');

module.exports = {
  template: require('./modal.html'),
  controller: ['$log', ModalController],
  controllerAs: 'modalCtrl',
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
};

function ModalController($log){
  $log.debug('init modalCtrl');
  // this.modalData = this.resolve.modalData;

  this.$onInit = function(){
    this.loginToggle = this.resolve.loginToggle;
  };

  this.handleClose = function() {
    this.modalInstance.close();
  };

}
