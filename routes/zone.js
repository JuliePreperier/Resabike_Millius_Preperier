var express = require('express');
var router = express.Router();
var models = require('../models');
var PersonContactModule = require('../modules/PersonContact');
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');


/* GET zone page . */
router.get('/', function(req, res, next) {
    res.render('zone');
});

/* POST new zone */
router.post('/', function(req, res, next){
    zoneModule.insertZone(req.body).then((zone) =>{
        loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{
            res.redirect('/');
        })
    })
});

module.exports = router;