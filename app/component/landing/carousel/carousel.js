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
  this.interval = 7000;
  this.slides = [
    {
      image: 'http://i68.tinypic.com/2wbt6if.jpg',
      id: 0,
      text: 'Art-c is awesome.',
    },
    {
      image: 'http://i67.tinypic.com/20qxv9l.jpg',
      id: 1,
      text: 'Look at cool art.',
    },
    {
      image: 'http://i66.tinypic.com/oqetlk.jpg',
      id:2,
      text: 'If you are cool you can sell it.',
    },
  ];
}
