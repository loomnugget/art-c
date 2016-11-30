'use strict';

require('./_carousel.scss');

module.exports = {
  template: require('./carousel.html'),
  controller: ['$log', CarouselController],
  controllerAs: 'carouselCtrl',
};

function CarouselController($log){
  $log.debug('init carouselCtrl');
  this.active = 0;
  this.interval = 5000;
  this.slides = [
    {
      image: 'http://i68.tinypic.com/2wbt6if.jpg',
      id: 0,
      title: 'Welcome',
      text: 'art-c is the home of art',
    },
    {
      image: 'http://i67.tinypic.com/20qxv9l.jpg',
      id: 1,
      title: 'Artists',
      text: 'View artists and their galleries',
    },
    {
      image: 'http://i66.tinypic.com/oqetlk.jpg',
      id: 2,
      title: 'Portfolio',
      text: 'Create a profile and galleries',
    },
  ];
}
