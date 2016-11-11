'use strict';

// Build sass - gets custom bootstrap and theme
require('./scss/main.scss');

// Require node modules
const path = require('path');

// Require npm modules
const angular = require('angular'); //create angular module
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// Require angular modules
// Injected in modules to do routing and bootstrap
const ngTouch = require('angular-touch'); // Dependency of bootstrap
const ngAnimate = require('angular-animate'); // Dependency of bootstrap
const uiRouter = require('angular-ui-router');
//const uiBootstrap = require('angular-ui-bootstrap'); // Need touch and animate to use
const ngFileUpload = require('ng-file-upload');

// Create angular module
// Add everything we need to module
const demoApp = angular.module(camelcase(__TITLE__), [ngTouch, ngAnimate, uiRouter, ngFileUpload]);

// create angular module
// set up $rootScope globals
demoApp.run(['$rootScope', function($rootScope){
  $rootScope.title = __TITLE__;
}]);

// WHAT DOES REQUIRE.CONTEXT DO?
//////////////////////////////////////
// 1. Loops through directory
// 2. Gives us path
// 3. Gives us the object to export

// BASENAME = name of file without folders or .js
// ex: start with app/goose/file.js --> returns 'file'
// true parameter -looks through sub-directories
// Require.context returns a function

// Returns object that has files that match regex in the config directory and loads it in
// Key - absolute path of where file was found
// Context has a method called keys that returns an array of paths
// For each loops across it and gives us the path name

// LOAD CONFIG
let context = require.context('./config/', true, /.js$/);
// Goes through config and finds files that end .js
context.keys().forEach( path => { // Gets array of paths -  path is the name returned
  demoApp.config(context(path)); // Gives us the object (module that is exported)
});

// LOAD VIEW CONTROLLERS
context = require.context('./view/', true, /.js$/);
// Looks in view for directories ending in js
context.keys().forEach( key => {
  // For every key, take path, and get the base name(home-controller)
  // Pascalcase turns it into HomeController
  let name = pascalcase(path.basename(key, '.js'));
  // Name controller based on file name
  // Pass in path into context -returns what was exported
  let module = context(key); // value of module.exports
  demoApp.controller(name, module);
});

// Load services
context = require.context('./service/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  demoApp.service(name, module);
});

// Load components
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  demoApp.component(name, module);
});

// Load filters
context = require.context('./filter/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  demoApp.filter(name, module);
});
