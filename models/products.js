'use strict';

var mongoose = require('mongoose');

var Products = new mongoose.Schema(
{
  // _id added by default
  name: String,
  price: String,
  description: String
},
{
  collection:"products"
});

module.exports = mongoose.model('products', Products);
