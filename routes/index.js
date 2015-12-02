'use strict';

var express = require('express');
var router = express.Router();

var jwt = require('jwt-simple');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router; 
