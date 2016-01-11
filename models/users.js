'use strict';

var mongoose = require('mongoose');

var Users = new mongoose.Schema(
{
  // _id added by default
  username:String,
},
{
  collection:"users"
});

module.exports = mongoose.model('users', Users);
