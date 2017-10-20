var express = require('express');
var router = express.Router();


/* GET zone page . */
router.get('/', function(req, res, next) {
    res.render('reservations');
});

module.exports = router;