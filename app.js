'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var dbConfig = require('./configs/db');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var jwtConfig = require('./configs/jwt');
var bearerToken = require('bearer-token');

mongoose.connect(dbConfig[process.env.NODE_ENV].url);

// Close the database connection when Node process ends. 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    process.exit(0); 
  }); 
});

var app = express();

// Clients passing JSON to this application must specify their 'content-type'
// to be 'application/json', otherwise the data will not be formatted correctly
// and the application will return 400.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Middleware to check each client request specifically accepts JSON responses.
 */
app.use(function(req, res, next) {
    
    var acceptHeader = req.get('accept');
    if(acceptHeader.indexOf('application/json') === -1) {
      res.status(406);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.send();
      return;
    }
    next();
});

var authenticateRoute = require('./routes/authenticate');
app.use('/api/v1/', authenticateRoute);

// Protect all subsequent routes with the access token.
app.use(function(req, res, next) {
  bearerToken(req, function(err, token) {
    if(err || (!token)) {
      // Unauthorised.
      res.status(401);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.send();
      return;
    }
    
    jwt.verify(token, jwtConfig[process.env.NODE_ENV].secret, function(err, decoded) {
      if(err) {
        // The token is expired or malformed. Send a 'forbidden'.
        res.status(403);
        res.set('Cache-Control', 'private, max-age=0, no-cache');
        res.send();
        return;
      }

      // Save the token to the request for use in other routes.
      req.decoded = decoded;
      next();
    });
  });
});

var productRoutes = require('./routes/products');
app.use('/api/v1/', productRoutes);

/**
 * Called when no routes match the requested route.
 */
app.use(function(req, res, next) {
  res.status(404);
  res.set('Cache-Control', 'private, max-age=0, no-cache');
  res.json();
});

/**
 * Error handler.
 */
app.use(function(err, req, res, next) {
  // Capture malformed JSON errors thrown by bodyParser.
  res.status(err.status);
  res.set('Cache-Control', 'private, max-age=0, no-cache');
  res.json();
  return;
});

module.exports = app;
