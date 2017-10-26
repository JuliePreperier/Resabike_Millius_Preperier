var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');



/* GET superadmin page . */
/*
router.get('/', function(req, res, next) {
    zoneModule.getAllZone().then((zones) => {
        lineModule.getAllLine().then((lines) => {
            res.render('superadmin', {zones: zones, lines: lines});
        })
    })
});
*/

router.get('/superadmin_lignes', (req,res,next)=>{
    zoneModule.getAllLine().then((lines) => {
        res.render('superadmin_lignes',{lines: lines});
    })
});

router.get('/superadmin_zones', (req,res,next)=>{
    zoneModule.getAllZone().then((zones) => {
        res.render('superadmin_zones',{zones: zones});
    })
});

/* POST new zone */
router.post('/newZone', function(req, res, next){
    zoneModule.insertZone(req.body).then((zone) =>{
        loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{
            res.redirect('/superadmin/superadmin_zones');
        })
    })
});

router.post('/newLine', function(req,res, next){
    zoneModule.getOneZone(req.body).then((zone) =>{
        apiSearch.searchLine(req.body).then((stations) =>{
            lineModule.insertLine(stations.connections[0], zone).then((line) =>{
                stationModule.insertStation(stations.connections[0].legs[0]).then((stationDep) =>{
                    lineStationModule.insertLineStation(stationDep,line).then(() =>{
                        stations.connections[0].legs[1].stops.forEach((stop) =>{
                            stationModule.insertStation(stop).then((station) =>{
                                lineStationModule.insertLineStation(station, line)
                            })
                        })
                    }).then(() =>{
                        stationModule.insertStation(stations.connections[0].legs[2]).then((stationsArr) =>{
                            lineStationModule.insertLineStation(stationsArr, line).then(() =>{
                                res.redirect('/superadmin')
                            })
                        })
                    })
                })
            })
        })
    })
});


module.exports = router;
