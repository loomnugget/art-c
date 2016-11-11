'use strict';

require('./_searchbar.scss');

module.exports = {
  template: require('./searchbar.html'),
  controllerAs: 'searchbarCtrl',
  bindings: {
    // two way  - parent to child and child to parent
    searchTerm: '=',
  },
};
