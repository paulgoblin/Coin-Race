'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http, socket, gameSrvc, userService) {

  $scope.showBoard = false;
  // $scope.user = null;

  //initialize user
  userService.get().then(function(resp) {
    // $scope.user = resp.data;
    gameSrvc.user = resp.data;
    gameSrvc.meId = resp.data._id; 
    $scope.showBoard = true;
    socket.emit('requestState')
  }); 

  socket.on('fulfillRequest', function(state){
    gameSrvc.state = state;
    $scope.makeMove(gameSrvc.user, null);
  })

  //initialize gameboard
  var $gameboard = gameSrvc.createBoard();

  //listen for new game state
  socket.on('changeState', function(state) {
    state[gameSrvc.meId] = gameSrvc.user;
    gameSrvc.drawBoard(state);
    $scope.players = gameSrvc.updatePlayers(state);
  });

  // emit new game state
  $scope.makeMove = function(user, action) {
    socket.emit('changeState', gameSrvc.changeState(user, action), gameSrvc.meId, gameSrvc.coinCollected);
    gameSrvc.drawBoard(gameSrvc.state); // optimistic updating
    gameSrvc.coinCollected = null;
  }

  // Listen for actions
  $("body").on("keydown", command);

  function command(event) {
    $scope.makeMove(gameSrvc.user, event.which)
  }

  $(window).on('beforeunload',function(){
    socket.emit('logout', gameSrvc.meId);
    socket.disconnect();
    gameSrvc.reset();
  })


});
