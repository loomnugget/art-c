'use strict';

require('./_artist.scss');

module.exports = ['$log', '$rootScope', 'galleryService', 'artistService', ArtistController];

function ArtistController($log, $rootScope, galleryService, artistService){
  $log.log('init artistCtrl');
  
}
