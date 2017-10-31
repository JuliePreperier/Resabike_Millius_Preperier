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

router.get('/superadmin_lignes', (req,res,next)=>{
    zoneModule.getAllZone().then((zones)=>{
        lineModule.getAllLineWithZone().then((lines) => {
            res.render('superadmin_lignes',{lines: lines, zones: zones});
        })
    })

});

router.get('/superadmin_zones', (req,res,next)=>{
    zoneModule.getAllZoneWithInfos().then((zones) => {
        res.render('superadmin_zones',{zones: zones});
    })
});

/* POST new zone */
router.post('/superadmin_zones', function(req, res, next){
    zoneModule.insertZone(req.body).then((zone) =>{ //insertion d'une nouvelle zone dans DB
        loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{ // insertion d'un zone admin login dans DB pour la zone créée
            personContactModule.insertEmptyPersonContact(zone).then(() =>{ // insertion d'une personContact vide dans DB pour la zone créée
                loginModule.insertdefaultLoginDriver(zone).then(() =>{ // insertion d'un login bus driver par defaut dans la DB pour la zone créée
                    res.redirect('/superadmin/superadmin_zones');
                })
            })
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
router.delete('/superadmin_lignes',(req, res)=>{
    let idLine = req.body.id_line;
    lineModule.deleteLine(idLine).then(() =>{
        lineStationModule.deleteLineStationWithLine(idLine)
    }).then(()=>{
        res.send(idLine);
    })
});

/*DELETE zone*/
router.delete('/superadmin_zones',(req, res)=>{
    let idZone = req.body.id_zone;
    loginModule.deleteLoginWithZone(idZone).then(() =>{
        lineModule.findLineWithZone(idZone).then((lines) =>{
            lines.forEach((line) =>{
                lineStationModule.deleteLineStationWithLine(line.id_line)
            })
        }).then(() =>{
            lineModule.deleteLineWithZone(idZone).then(() =>{
                personContactModule.deletePersonContactWithZone(idZone).then(() =>{
                    zoneModule.deleteZone(idZone)
                })
            })
        })
    }).then(()=>{
        res.send(idZone);
    })
});

/*Update infos*/
router.put('/superadmin_zones',(req, res) =>{
    zoneModule.updateZoneFromModal(req.body.idZone, req.body.zoneName).then((zone) =>{
        res.redirect('/superadmin/superadmin_zones')
    })
});

module.exports = router;