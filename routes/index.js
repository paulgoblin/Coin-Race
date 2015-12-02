'use strict';

var express = require('express');
var router = express.Router();

var jwt = require('jwt-simple');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/user', function(req, res) {
  var t = req.headers.authorization.split(' ')[1];

  var payload = null; 
  try {
    payload = jwt.decode(t, process.env.JWT_SECRET);
  } catch(err) {
    return res.status(401).send({ message: err.message });
  }

  var user = payload.sub;
  User.findById(user, function(err, user) {
    if(err) res.statu(400).send(err.message);

    res.send(user);
  });
});

router.get('/users', function(req, res) {
  var t = req.headers.authorization.split(' ')[1];

  var payload = null; 
  try {
    payload = jwt.decode(t, process.env.JWT_SECRET);
  } catch(err) {
    return res.status(401).send({ message: err.message });
  }

  var db = payload.sub;

  User.find({}, function(err, users) {
    console.log(users);
    res.send(users);
  });
});

module.exports = router; 
