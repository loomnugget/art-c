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
      image: 'http://lorempixel.com/400/200/',
    },
    {
      image: 'http://lorempixel.com/400/200/food',
    },
    {
      image: 'http://lorempixel.com/400/200/sports',
    },
    {
      image: 'http://lorempixel.com/400/200/people',
    },
  ];
}
