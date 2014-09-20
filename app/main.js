'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.weeksView',
  'myApp.weekView',
  'myApp.version'
]).
config(config);

function config ($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/weeks'});
};
