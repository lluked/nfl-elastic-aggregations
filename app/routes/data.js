var express = require('express');
var router = express.Router();

// Import searches
var donut = require('../searches/donut');
var tree = require('../searches/tree');

/* GET donut. */
router.get('/donut', function(req, res, next) {
  donut.Search(function(results) {
    if(results){
      res.send(results)
    }
  })
});

/* GET tree. */
router.get('/tree', function(req, res, next) {
  tree.Search(function(results) {
    if(results){
      res.send(results)
    }
  })
});

module.exports = router;
