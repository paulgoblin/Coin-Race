'use strict';

var app = angular.module('MyApp', ['satellizer', 'ui.router', 'btford.socket-io']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider 
  .state('login', { url: '/', templateUrl: 'partials/login.html', controller: 'loginCtrl'})
  .state('home', { url: '/home', templateUrl: 'partials/home.html', controller:'homeCtrl' });
  
  $authProvider.facebook({
    clientId: '1513930685602169'
  });
});

app.factory('socket', function(socketFactory) {
  var socket = io.connect('http://localhost:3000/');
  // var socket = io.connect(window.location.hostname);
  return socketFactory({ ioSocket: socket });
}); 