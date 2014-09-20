'use strict';

angular.module('myApp.weekView', ['ngRoute', 'pnpServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:id', {
    templateUrl: 'weekView/weekView.html',
    controller: 'WeekCtrl'
  });
}])

.controller('WeekCtrl', [ '$routeParams', '$scope', 'Week', function($routeParams, $scope, Week) {
  $scope.week = Week.findById({id: $routeParams.id});
  $scope.days = Week.days({id: $routeParams.id});
}]);