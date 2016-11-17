'use strict';

require('./_landing.scss');

module.exports = ['$log', LandingController];

function LandingController($log) {
  $log.debug('init landingCtrl');
}
