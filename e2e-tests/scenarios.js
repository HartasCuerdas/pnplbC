'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('/');

  it('should automatically redirect to /weeks when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/weeks");
  });


  describe('weeks', function() {

    beforeEach(function() {
      browser.get('/weeks');
    });


    it('should render weeks when user navigates to /weeks', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Weeks/);
    });

  });


  describe('week', function() {

    beforeEach(function() {
      browser.get('/541e4f15e407841c33bb8f18');
    });


    it('should render week when user navigates to /541e4f15e407841c33bb8f18', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Week/);
    });

  });
});
