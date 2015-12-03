'use strict';


let PORT = process.env.PORT || 3000;

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
var http = require('http');

let app = express();

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/gamedb');

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// 404 HANDLER
app.use((req, res) => {
  res.status(404).render('404')
});

//SOCKET
var server = http.Server(app);
var io = require('socket.io')(server);

var numPlayers = 0;

var latency = 100;  // state emission latency
var boardDim = 30;  // also change in game service!!!!!!!

var state = {}; 
io.on('connection', function(socket) {
  console.log('state on conection: ',state)


  // CLIENT LISTENERS
  socket.on('changeState', function(newState, userId){
    state[userId] = newState[userId];
    io.emit('changeState', state);
    // io.emit('changeState', state)
  })
  socket.on('requestState', function (){
    numPlayers++;
    console.log('numPlayers', numPlayers)
    console.log('emitting state', state);
    socket.emit('fulfillRequest', state);
  })
  socket.on('logout', function(logoutId){
    delete state[logoutId];
    console.log('loggedout player', logoutId, state);
  })
  socket.on('disconnect', function(){
    numPlayers--;
    console.log('numPlayers', numPlayers)
    console.log('client disconnected')
  })

  // STATE EMITER
  var stateEmitInterval = setInterval(function(){
    // console.log('emitting state', state);
    io.emit('changeState', state);
  },latency);



  // // COIN GENERATOR
  // var addCoin = function(dim){
  //   var row = Math.floor(Math.random()*dim);
  //   var col = Math.floor(Math.random()*dim);
  //   var coin = {};
  //   coin.row = row;
  //   coin.col = col;
  //   coin.type = "coin";
  //   state[date.now()] = coin;
  // }

  // var coinAtInterval = function() {
  //   var rand = Math.round(Math.random() * (5000 - 500)) + 500;
  //   setTimeout(function() {
  //     addCoin(boardDim);
  //     if (numPlayers>0) {
  //       coinAtInterval();
  //     }  
  //   }, rand);
  // };

  // var checkPlayersInterval = setInterval(function(){
  //   if(numPlayers<1) return;
  //   coinAtInterval()
  // },1000);


});  // io.on('connection'


server.listen(PORT);

// app.listen(PORT, () => {
//   console.log('Listening on port ', PORT);
// });


