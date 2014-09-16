'use strict';

angular.module('myApp.weekView', ['ngRoute', 'pnpServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weekView', {
    templateUrl: 'weekView/weekView.html',
    controller: 'WeekCtrl'
  });
}])

.controller('WeekCtrl', [ '$scope', 'Week', 'Day', function($scope, Week, Day) {
  $scope.week = Week.findById({'id': '541663bbd25316c24b30bcc2'});
  $scope.days = Day.find({where: {'weekId': '541663bbd25316c24b30bcc2'}});

}]);