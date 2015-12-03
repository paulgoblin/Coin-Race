'use strict'

app.service('gameSrvc', function(){

  this.reset = () => {
    this.state = {};
    this.meId = null;
    this.user = null;
    this.$emptyBoard = null;
    console.log('reset game', this.state, this.meId, this.user)
  }

  this.reset();

  //BOARD PARAMS
  var boardDim = 30;  // number of square per row
  var squareSize = 2; // in vh
  var squareCss = {
    width: squareSize + 'vh',
    height: squareSize + 'vh'
  }
  var boardSize = boardDim*squareSize;
  var boardCss = {
    width: boardSize + 'vh',
    height: boardSize + 'vh'
  }

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

  // // for drawing item types
  // this.typeDict = {
  //   me: {
  //     attr: 'background-color',
  //     val: 'red'
  //   },
  //   player: {
  //     attr: 'background-color',
  //     val: 'white'
  //   }
  //   coin: {
  //     attr: 'background-color',
  //     val: 'yellow'
  //   }
  // }

  //DRAW BOARD
  this.drawBoard = (state) => {
    // console.log('drawing state', state)
    this.state = state;
    var $newBoard = this.$emptyBoard.clone();
    this.state = state;
    for (var key in this.state) {
      var item = state[key];
      // console.log('drawing item', item, state)
      var row = item.row;
      var col = item.col;
      if(key === this.meId) {
        this.user = item;
        var type = "me"
      } else {
        var type = item.type; 
      }
      $newBoard.find(`#${row}-${col}`).addClass(type);
    }
    return $newBoard;
  }


  // for mapping keys to actions
  this.actionDict = {
    37: 'moveLeft',
    38: 'moveUp',
    39: 'moveRight',
    40: 'moveDown',

  }

  //CHANGE STATE
  this.changeState = (user, command) => {
    // console.log('state and user id before initialize: ', this.state, user._id)
    // initialize user
    if (!this.state[user._id]) {
      // console.log('state before initialize', this.state)
      var row = Math.floor(Math.random()*boardDim);
      var col = Math.floor(Math.random()*boardDim);
      user.row = row; // give random coordinates
      user.col = col; // give random coordinates
      user.type = "player";
      // console.log('creating user at ', user.col, user.row);
      this.state[user._id] = user;
      // console.log('state after initialize', this.state)
      return this.state;
    }

    // this.user = this.state[user._id];
    // console.log('stored user', this.user )

    var action = this.actionDict[command];
    if (!action) return this.state;

    switch(action) {
      case 'moveLeft':
        user.col = (user.col === 0) ? user.col : user.col - 1;
        break;
      case 'moveUp':
        user.row = (user.row === 0) ? user.row : user.row - 1;
        break;
      case 'moveRight':
        user.col = (user.col === boardDim-1) ? user.col : user.col + 1;
        break;
      case 'moveDown':
        user.row = (user.row === boardDim-1) ? user.row : user.row + 1;
        break;
      default:
        // console.log('other moves')
    }
    // this.user = user;
    this.state[user._id] = user;
    return this.state;
  }

});








