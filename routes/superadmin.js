var express = require('express');
var router = express.Router();

/* GET superadmin page . */
router.get('/', function(req, res, next) {
    res.render('superadmin');
});

module.exports = router;
