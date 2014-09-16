'use strict';

angular.module('myApp.weeksView', ['ngRoute', 'pnpServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weeks', {
    templateUrl: 'weeksView/weeksView.html',
    controller: 'WeeksCtrl'
  });
}])

.controller('WeeksCtrl', [ '$scope', 'Week', function($scope, Week) {
  $scope.weeks = Week.find();

}]);