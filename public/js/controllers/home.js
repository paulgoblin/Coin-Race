'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http) {

  

  // create game board
  var boardDim = 12;
  var countArr = new Array(boardDim).fill();
  var $gameboard = $('<div>').addClass('gameboard');
  countArr.forEach(function(_,index){
    var $row = countArr.map(() => $('<div>').addClass('square'));
    $gameboard.append($row);
  })
  console.log('boardSquares', $gameboard)

  $('.game').append($gameboard)



});
