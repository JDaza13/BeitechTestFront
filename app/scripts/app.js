var app = null;

(function () {
  'use strict';
  app = angular
  .module('ajsApp', [
    'common.services',
    'dx',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

}());