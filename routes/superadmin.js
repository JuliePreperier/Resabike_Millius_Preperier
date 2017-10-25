var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');


/* GET superadmin page . */
router.get('/', function(req, res, next) {
    zoneModule.getAllZone().then((zones) => {
        lineModule.getAllLine().then((lines) => {
            res.render('superadmin', {zones: zones, lines: lines});
        })
    })
});

/* POST new zone */
router.post('/newZone', function(req, res, next){
    zoneModule.insertZone(req.body).then((zone) =>{
        loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{
            res.redirect('/superadmin');
        })
    })
});


/*POST new Line*/
router.post('/newLine', function(req, res, next){
    zoneModule.getOneZone(req.body).then((zone) =>{
        lineModule.insertLine(req.body, zone).then((line) => {
            apiSearch.searchLine(line.fromStation, line.toStation).then((stations) =>{
                console.log(stations.connections[0].legs[1].stops)                          // LOGS
                stations.connections[0].legs[1].stops.forEach((stop) =>{
                    stationModule.insertStation(stop).then((station) =>{
                        lineStationModule.insertLineStation(station,line)
                    });
                })
            })
        })
    })
});



module.exports = router;
