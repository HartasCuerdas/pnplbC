'use strict';

angular.module('myApp.view1', ['ngRoute', 'pnpServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', 'Week', function($scope, Week) {
  $scope.week = Week.count();

}]);