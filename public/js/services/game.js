'use strict'

app.service('gameSrvc', function(){

  this.state = {};

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

  this.$emptyBoard = null;

  //CREATE BOARD
  this.createBoard = () => {
    var countArr = new Array(boardDim).fill();
    var $gameboard = $('<div>').addClass('gameboard');
    var $square = $('<div>').addClass('square').css(squareCss)
    countArr.forEach(function(_,row){
      var $row = countArr.map( (_,col) =>  $square.clone().attr('id',`${row}-${col}`));
      $gameboard.append($row);
    })
    this.$emptyBoard = $gameboard.css(boardCss);
    return this.$emptyBoard;
  }


  this.typeDict = {
    me: '{background-color: red}'
  }


  //DRAW BOARD
  this.drawBoard = (state) => {
    var $newBoard = this.$emptyBoard.clone();
    console.log('new board', $newBoard)
    this.state = state;
    for (var key in this.state) {
      var item = state[key];
      var row = item.co[0];
      var col = item.co[1];
      console.log('found board',$newBoard.find(`#${row}-${col}`))
      $newBoard.find(`#${row}-${col}`).css("background-color", 'red');
    }
    return $newBoard;
  }

  //CHANGE STATE
  this.changeState = (user, action) => {
    if (!this.state[user._id]) {
      var row = Math.floor(Math.random()*boardDim);
      var col = Math.floor(Math.random()*boardDim);
      user.co = [row, col]; // give random coordinates
      user.type = 'me';
      console.log('creating user at ', user.co);
      this.state[user._id] = user;
      return this.state;
    }

  }


});