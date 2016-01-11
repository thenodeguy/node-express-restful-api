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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var users = require('./routes/users');
app.use('/api/v1/', users);

module.exports = app;
