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

io.on('connection', function(socket) {
  socket.emit('hello', 'history');
});



app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});


