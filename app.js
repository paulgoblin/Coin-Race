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

var state = {}; 
io.on('connection', function(socket) {
  console.log('state on conection: ',state)
  // io.emit('changeState', state);
  socket.on('changeState', function(newState){
    console.log('this is the new state', newState);
    state = newState;
    // io.emit('changeState', state)
  })

  var stateEmitInterval = setInterval(function(){
    console.log('emitting state', state);
    io.emit('changeState', state);
  },100)

  socket.on('requestState', function (){
    console.log('emitting state', state)
    socket.emit('fulfillRequest', state);
  })

});

server.listen(PORT);

// app.listen(PORT, () => {
//   console.log('Listening on port ', PORT);
// });


