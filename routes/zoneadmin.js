var express = require('express');
var router = express.Router();var zoneModule = require('../modules/zone');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');

/* GET zoneAdmin page . */

router.get('/zoneadmin_lignes', (req,res,next)=>{
    lineModule.getAllLineWithZone(1).then((lines) => { // PRENDRE LA ZONE DU ZONE ADMIN DANS LE SESSION !!!
        res.render('zoneadmin_lignes',{lines: lines});
    })

});

router.post('/zoneadmin_lignes', function(req,res, next){
    zoneModule.getOneZoneWithId(1).then((zone) =>{ // PRENDRE LA ZONE DU ZONEADMIN DANS LE SESSION
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


module.exports = router;