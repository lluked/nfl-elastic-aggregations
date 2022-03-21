var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'About' });
});

/* GET donut page. */
router.get('/donut', function(req, res, next) {
  res.render('donut', { title: 'Donut chart - Total touchdowns by quarter' });
});

/* GET tree page. */
router.get('/tree', function(req, res, next) {
  res.render('tree', { title: 'Tree diagram - Total touchdowns per quarter, sorted by team then player' });
});

module.exports = router;
