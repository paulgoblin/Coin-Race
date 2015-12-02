'use strict'

app.service('gameSrvc', function(){

  //BOARD PARAMS
  var boardDim = 30;  // number of square per row
  var squareSize = 3; // in px
  var squareCss = {
    width: squareSize + 'vh',
    height: squareSize + 'vh'
  }
  var boardSize = boardDim*squareSize;
  var boardCss = {
    width: boardSize + 'vh',
    height: boardSize + 'vh'
  }


  this.createBoard = function(){
    var countArr = new Array(boardDim).fill();
    var $gameboard = $('<div>').addClass('gameboard');
    var $square = $('<div>').addClass('square').css(squareCss)
    countArr.forEach(function(_,row){
      var $row = countArr.map( (_,col) =>  $square.clone().data('co',[row,col]) );
      $gameboard.append($row);
    })
    return $gameboard.css(boardCss)
  }
});