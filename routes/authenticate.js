'use strict';

var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../configs/jwt');


router.post('/authenticate', function(req, res, next) {
  
  // Test the json is formatted correctly. This was actually done earlier by bodyParser.
  // If the json was malformed, bodyParser will have thrown an error and this entire
  // method will be bypassed. 
  
  // Test the json includes username and password.
  var isMissingProperty = false;
  if(!req.body.hasOwnProperty('username')) {
    isMissingProperty = true;
  }

  if(!req.body.hasOwnProperty('password')) {
    isMissingProperty = true;
  }

  if(isMissingProperty) {
    res.status(400);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.send();
    return;  
  }

  // All the conditions are satisifed. Attempt to locate the User.
  Users.findOne({ username: req.body.username, password: req.body.password }, function(err, user) {
    if(err) {
      res.status(500);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    if(user == null) {
      // The username and/or password is wrong. Return a 'forbidden', the user
      // does not exist.
      res.status(403);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    // The user has been located. Create a token to provide the user with access
    // to the protected resources.
    var token = jwt.sign(
      user,
      jwtConfig[process.env.NODE_ENV].secret,
      { expiresIn: 60 * 60 }
    );
    
    res.status(200);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.json({"token":token});
  });;
});

module.exports = router;
