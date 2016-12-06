'use strict';

require('./_searchbar.scss');

module.exports = {
  template: require('./searchbar.html'),
  controllerAs: 'searchbarCtrl',
  bindings: {
    searchTerm: '=',
  },
};
