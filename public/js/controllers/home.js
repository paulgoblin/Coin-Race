'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http, socket, gameSrvc, userService) {

  $scope.showBoard = false;
  $scope.user = null;

  //initialize user
  userService.get().then(function(resp) {
    $scope.user = resp.data;  
    $scope.showBoard = true;
    $scope.makeMove($scope.user, null)
  }); 

  //initialize gameboard
  var $gameboard = gameSrvc.createBoard();

  //listen for new game state
  socket.on('changeState', function(state) {
    $gameboard = gameSrvc.drawBoard(state);
    var $game = $('.game');
    $game.empty();
    $game.append($gameboard);
  });

  // emit new game state
  $scope.makeMove = function(user, action) {
    socket.emit('changeState', gameSrvc.changeState(user, action));
  }

  // Listen for actions
  $("body").on("keydown", command);

  function command(event) {
    $scope.makeMove($scope.user, event.which)
  }


});
