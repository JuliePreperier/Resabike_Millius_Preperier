var express = require('express');
var router = express.Router();
var models = require('../models');
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');

/* GET superadmin page . */
router.get('/', function(req, res, next) {
    res.render('superadmin');
});

/* POST new zone */
router.post('/newZone', function(req, res, next){
    zoneModule.insertZone(req.body).then((zone) =>{
        loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{
            res.redirect('/superadmin');
        })
    })
});


module.exports = router;
