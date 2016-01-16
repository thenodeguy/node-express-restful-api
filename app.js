'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var dbConfig = require('./configs/db');
var mongoose = require('mongoose');

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

var productRoutes = require('./routes/products');
app.use('/api/v1/', productRoutes);

/**
 * Called when no routes match the requested route.
 */
app.use(function(req, res, next) {
  res.status(404);
  res.json();
});

/**
 * Error handler.
 */
app.use(function(err, req, res, next) {
  // Capture malformed JSON errors thrown by bodyParser.
  res.status(err.status);
  res.json();
  return;
});

module.exports = app;
