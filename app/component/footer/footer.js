'use strict';

require('./_footer.scss');

module.exports = {

  template: require('./footer.html'),
  controller: ['$log', FooterController],
  controllerAs: 'footerCtrl',
};

function FooterController($log) {
  $log.debug('init footerCtrl');

  this.copyright = '2016 art-c';
  this.githubLink = 'https://github.com/loomnugget/art-c';
  this.githubLinkName = 'Check out the code on ';
}
