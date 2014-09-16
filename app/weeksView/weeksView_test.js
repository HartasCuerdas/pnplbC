'use strict';

describe('myApp.weeksView module', function() {

  beforeEach(module('myApp.weeksView'));

  describe('Weeks controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var scope = {};
      var view1Ctrl = $controller('WeeksCtrl', {$scope:scope});
      expect(view1Ctrl).toBeDefined();
    }));

  });
});