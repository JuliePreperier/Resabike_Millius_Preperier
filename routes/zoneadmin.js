var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var lineModule = require('../modules/line');

/* GET superadmin page . */

router.get('/zoneadmin_lignes', (req,res,next)=>{
    zoneModule.getAllZone().then((zones)=>{
        lineModule.getAllLineWithZone().then((lines) => {
            res.render('zoneadmin_lignes',{lines: lines, zones: zones});
        })
    })

});


module.exports = router;