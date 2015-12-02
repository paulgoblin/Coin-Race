'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http, socket, gameSrvc, userService) {

  userService.get().then(function(resp) {
    $scope.user = resp.data;  
    console.log($scope.user);
  }); 

  var $gameboard = gameSrvc.createBoard();

  $('.game').append($gameboard)

  socket.on('changeState', function(state) {
    console.log(state);
  });
});
