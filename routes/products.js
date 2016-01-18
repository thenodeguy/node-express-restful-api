'use strict';

var express = require('express');
var router = express.Router();
var Products = require('../models/products');

/**
 * Middleware to check each client request specifically accepts JSON responses.
 */
router.use(function(req, res, next) {
    
    var acceptHeader = req.get('accept');
    if(acceptHeader.indexOf('application/json') === -1) {
      res.status(406);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.send();
      return;
    }
    next();
});

router.get('/products', function(req, res, next) {
  Products.find(function(err, products) {
    if(err) {
      // This represents a real error (not an empty products list, which will
      // not generate an error).
      res.status(500);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    var response = {
      "products": products
    };
    
    res.status(200);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.json(response);
  });
});

router.get('/products/:id', function(req, res, next) {

  Products.findById(req.params.id, function(err, product) {
    if(err) {
      // The resource cannot be found.
      res.status(404);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    res.status(200);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.json(product);
  });
});

router.post('/products', function(req, res, next) {
  
  // Test the json is formatted correctly. This was actually done earlier by bodyParser.
  // If the json was malformed, bodyParser will have thrown an error and this entire
  // method will be bypassed.
  
  // Test the json includes name, price and description.
  var isMissingProperty = false;
  if(!req.body.hasOwnProperty('name')) {
    isMissingProperty = true;
  }
  
  if(!req.body.hasOwnProperty('price')) {
    isMissingProperty = true;
  }
  
  if(!req.body.hasOwnProperty('description')) {
    isMissingProperty = true;
  }
  
  if(isMissingProperty) {
    res.status(400);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.send();
    return;  
  }

  // All the conditions are satisifed. Save and return.
  var product = new Products();
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  
  product.save(function(err) {
    if(err) {
      res.status(500);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    res.status(200);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.json(product);
  });
});

router.put('/products/:id', function(req, res, next) {

  Products.findById(req.params.id, function(err, product) {
    if(err) {
      // The resource cannot be found.
      res.status(404);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    // Test the json is formatted correctly. This was actually done earlier by bodyParser.
    // If the json was malformed, bodyParser will have thrown an error and this entire
    // method will be bypassed.
    
    var isValidUpdate = false;
    if(req.body.hasOwnProperty('name')) {
      isValidUpdate = true;
      product.name = req.body.name;
    }
    
    if(req.body.hasOwnProperty('price')) {
      isValidUpdate = true;
      product.price = req.body.price;
    }
    
    if(req.body.hasOwnProperty('description')) {
      isValidUpdate = true;
      product.description = req.body.description;
    }
    
    // Test to ensure that at least one field has been updated.
    if(!isValidUpdate) {
      res.status(400);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.send();
      return;  
    }

    product.save(function(err) {
      if(err) {
        res.status(500);
        res.set('Cache-Control', 'private, max-age=0, no-cache');
        res.json();
        return;
      }
      
      res.status(200);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json(product);
    });
  });
});

router.delete('/products/:id', function(req, res, next) {
  Products.findByIdAndRemove(req.params.id, function(err, product) {
    if(err) {
      // An error occured.
      res.status(404);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    if(product === null) {
      // The resource cannot be found.
      res.status(404);
      res.set('Cache-Control', 'private, max-age=0, no-cache');
      res.json();
      return;
    }
    
    res.status(204);
    res.set('Cache-Control', 'private, max-age=0, no-cache');
    res.json();
  });
});

module.exports = router;
