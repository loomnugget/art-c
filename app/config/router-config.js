'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/landing#signup');
  $urlRouterProvider.when('/' , '/landing#signup');
  $urlRouterProvider.when('/signup' , '/landing#signup');
  $urlRouterProvider.when('/login' , '/landing#login');

  let states = [
    {
      name: 'home',
      url: '/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController',
      template: require('../view/home/home.html'),
    },

    {
      name: 'welcome',
      url: '/landing',
      controllerAs: 'landingCtrl',
      controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
