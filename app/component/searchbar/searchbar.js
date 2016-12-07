'use strict';

module.exports = {
  template: require('./searchbar.html'),
  controllerAs: 'searchbarCtrl',
  bindings: {
    searchTerm: '=',
  },
};
