'use strict';

var express = require('express');
var router = express.Router();
var Users = require('../models/users');


router.get('/users', function(req, res, next) {
  Users.find(function(err, users) {
    if(err) {
      res.json({"message":"Failed to retrieve users"});
      return;
    }
    
    res.json(users);
  });
});

router.get('/users/:username', function(req, res, next) {
  Users.find({ "username": req.params.username }, function(err, user) {
    if(err) {
      res.json({"message":"Failed to retrieve user"});
      return;
    }
    
    res.json(user);
  });
});

router.post('/users', function(req, res, next) {

  var user = new Users();
  user.username = req.body.username;
  
  user.save(function(err) {
    if(err) {
      res.json({"message":"Failed to create user"});
      return;
    }
    
    res.json(user);
  });
});

router.put('/users/:username', function(req, res, next) {
  Users.findOne({ "username": req.params.username }, function(err, user) {
    if(err) {
      res.json({"message":"Failed to retrieve user"});
      return;
    }

    user.username = req.body.username;
    user.save(function(err) {
      if(err) {
        res.json({"message":"Failed to update user"});
        return;
      }
      res.json(user);
    });
  });
});

router.delete('/users/:username', function(req, res, next) {
  Users.remove({ "username": req.params.username }, function(err) {
    if(err) {
      res.json({"message":"Failed to retrieve user"});
      return;
    }
    
    res.json({"message":"Successfully deleted user"});
  });
});

module.exports = router;
