'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http, socket, gameSrvc, userService) {

  $scope.showBoard = false;
  $scope.user = null;

  //initialize user
  userService.get().then(function(resp) {
    $scope.user = resp.data; 
    gameSrvc.meId = $scope.user._id; 
    gameSrvc.user = $scope.user;
    $scope.showBoard = true;
    socket.emit('requestState')
  }); 

  socket.on('fulfillRequest', function(state){
    gameSrvc.state = state;
    console.log('moving user', state, state[gameSrvc.meId], state, gameSrvc.user)
    // gameSrvc.user =  state[gameSrvc.meId] || gameSrvc.user ;
    $scope.makeMove(gameSrvc.user, null);
  })

  //initialize gameboard
  var $gameboard = gameSrvc.createBoard();

  //listen for new game state
  socket.on('changeState', function(state) {
    console.log("change state recieved", state)
    $gameboard = gameSrvc.drawBoard(state);
    var $game = $('.game');

    $game.empty();
    $game.append($gameboard);
  });

  // emit new game state
  $scope.makeMove = function(user, action) {
    console.log('making move')
    socket.emit('changeState', gameSrvc.changeState(user, action));
  }

  // Listen for actions
  $("body").on("keydown", command);

  function command(event) {
    console.log("moving char", $scope.user, event.which)
    $scope.makeMove($scope.user, event.which)
  }


});
