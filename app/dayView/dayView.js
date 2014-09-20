'use strict';

angular.module('myApp.dayView', ['ngRoute', 'pnpServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/day/:id', {
    templateUrl: '/dayView/dayView.html',
    controller: 'DayCtrl'
  });
}])

.controller('DayCtrl', [ '$routeParams', '$scope', 'Day', function($routeParams, $scope, Day) {
  $scope.day = Day.findById({id: $routeParams.id});
  $scope.ods = Day.ods({id: $routeParams.id});
}]);