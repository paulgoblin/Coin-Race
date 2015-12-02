'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http, socket, gameSrvc, userService) {

  $scope.showBoard = false;

  userService.get().then(function(resp) {
    $scope.user = resp.data;  
    $scope.showBoard = true;
    $scope.makeMove($scope.user, null)
  }); 

  var $gameboard = gameSrvc.createBoard();

  $('.game').append($gameboard)

  socket.on('changeState', function(state) {
    $gameboard = gameSrvc.drawBoard(state);
    var $game = $('.game');
    console.log('game', $gameboard)
    $game.empty();
    $game.append($gameboard);
  });

  $scope.makeMove = function(user, action) {
    socket.emit('changeState', gameSrvc.changeState(user, null));
  }

});
