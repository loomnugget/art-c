'use strict';

module.exports = {
  template: require('./carousel.html'),
  controller: ['$log', CarouselController],
  controllerAs: 'carouselCtrl',
};

function CarouselController($log){
  $log.debug('init carouselCtrl');
  this.interval = 3000;
  this.slides = [
    {
      image: 'http://i68.tinypic.com/2wbt6if.jpg',
    },
    {
      image: 'http://i67.tinypic.com/20qxv9l.jpg',
    },
    {
      image: 'http://i66.tinypic.com/oqetlk.jpg',
    },
    {
      image: 'http://i66.tinypic.com/oqetlk.jpg',
    },
  ];
}
