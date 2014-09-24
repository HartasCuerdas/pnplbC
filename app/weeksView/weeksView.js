'use strict';

angular.module('myApp.weeksView', ['ngRoute', 'pnpServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weeks', {
    templateUrl: 'weeksView/weeksView.html',
    controller: 'WeeksCtrl'
  });
}])

.controller('WeeksCtrl', [ '$scope', 'Week', function($scope, Week) {

  $scope.weeks = Week.find({filter: {order: 'firstDay DESC', fields: {oAvg: false} }});

  $scope.createNewWeek = function() {
    (Week.createNewWeek())
      .$promise
        .then(function(data) {
          $scope.weeks.push(data.week);
        })
        .catch(function(response) {
          console.log('response: ' + response);
        });
  };

}]);