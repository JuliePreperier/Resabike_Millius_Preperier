var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');
var personContactModule = require('../modules/personContact');



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
    zoneModule.getAllZone().then((zones)=>{
        lineModule.getAllLine().then((lines) => {
            res.render('superadmin_lignes',{lines: lines, zones: zones});
        })
    })

});

router.get('/superadmin_zones', (req,res,next)=>{
    zoneModule.getAllZone().then((zones) => {
        res.render('superadmin_zones',{zones: zones});
    })
});

/* POST new zone */
router.post('/superadmin_zones', function(req, res, next){
    zoneModule.insertZone(req.body).then((zone) =>{
        loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{
            res.redirect('/superadmin/superadmin_zones');
        })
    })
});

router.post('/superadmin_lignes', function(req,res, next){
    zoneModule.getOneZone(req.body).then((zone) =>{
        apiSearch.searchLine(req.body).then((stations) =>{
            if(stations.connections[0].legs.length<=2){
                lineModule.insertFindOrCreateLine(stations.connections[0], zone).then((line) =>{
                    stationModule.insertFindOrCreateStation(stations.connections[0].legs[0]).then((stationDep) =>{
                        lineStationModule.insertLineStation(stationDep,line).then(() =>{
                            stations.connections[0].legs[0].stops.forEach((stop) =>{
                                stationModule.insertFindOrCreateStation(stop).then((station) =>{
                                    lineStationModule.insertLineStation(station, line)
                                })
                            })
                        }).then(() =>{
                            stationModule.insertFindOrCreateStation(stations.connections[0].legs[1]).then((stationsArr) =>{
                                lineStationModule.insertLineStation(stationsArr, line).then(() =>{
                                    res.redirect('/superadmin/superadmin_lignes')
                                })
                            })
                        })
                    })
                })
            }
            else{
                res.redirect('/superadmin/superadmin_zones')
            }
        })
    })
});

/*DELETE line*/
router.delete('/line',(req, res)=>{
    let idLine = req.body.id_line;
    lineModule.deleteLine(idLine).then(() =>{
        lineStationModule.deleteLineStationWithLine(idLine).then(() =>{
            res.redirect('/superadmin/superadmin_lignes');
        })
    })
});

/*DELETE line
router.delete('/zones',(req, res)=>{
    let idZone = req.body.id_zone;
    zoneModule.deleteZone()
});*/.





module.exports = router;