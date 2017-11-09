var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');
var personContactModule = require('../modules/personContact');
var journeyReservationModule = require('../modules/journeyReservation');
var journeyModule = require('../modules/journey');

/* GET superadmin_lignes page . */

router.get('/superadmin_lignes', (req,res,next)=>{
    zoneModule.getAllZone().then((zones)=>{
        lineModule.getAllLineWithZone().then((lines) => {
            if(req.session.user.id_role === 1){
                res.render('superadmin_lignes',{lines: lines, zones: zones, messageErreur: ''});
            }
            else{
                req.session.authenticated = false;
                res.redirect('/login');
            }
        })
    })
});

/* GET superadmin_zones page*/
router.get('/superadmin_zones', (req,res,next)=>{
    zoneModule.getAllZoneWithInfos().then((zones) => {
        if(req.session.user.id_role === 1) {
            res.render('superadmin_zones', {zones: zones});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/login');
        }
    })
});

/* GET superadmin_reservations page*/
router.get('/superadmin_reservations', function(req, res, next) {
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        if(req.session.user.id_role === 1) {
            res.render('superadmin_reservations',{zoneToReservations: zoneToReservations});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/login');
        }
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
                lineModule.insertFindOrCreateLine(stations.connections[1], zone).then((line) =>{
                    stationModule.insertFindOrCreateStation(stations.connections[1].legs[0]).then((stationDep) =>{
                        lineStationModule.insertLineStation(stationDep,line).then(() =>{
                            stations.connections[1].legs[0].stops.forEach((stop) =>{
                                stationModule.insertFindOrCreateStation(stop).then((station) =>{
                                    lineStationModule.insertLineStation(station, line)
                                })
                            })
                        }).then(() =>{
                            stationModule.insertFindOrCreateStation(stations.connections[1].legs[1]).then((stationsArr) =>{
                                lineStationModule.insertLineStation(stationsArr, line).then(() =>{
                                    res.redirect('/superadmin/superadmin_lignes')
                                })
                            })
                        })
                    })
                })
            }
            else{
                zoneModule.getAllZone().then((zones)=>{
                    lineModule.getAllLineWithZone().then((lines) => {
                        if(req.session.user.id_role === 1){
                            res.render('superadmin_lignes',{lines: lines, zones: zones, messageErreur: 'Les multi-ligne ne sont pas autorisés. Veuillez entrer des stations présentes dans une seule ligne'});
                        }
                        else{
                            req.session.authenticated = false;
                            res.redirect('/login');
                        }
                    })
                })
            }
        })
    })
});

/*DELETE line*/
router.delete('/superadmin_lignes',(req, res)=>{
    let idLine = req.body.id_line;
    journeyModule.deleteJourneyWithLine(idLine).then((nbrow) =>{
        lineModule.deleteLine(idLine).then(() =>{
            lineStationModule.deleteLineStationWithLine(idLine)
        }).then(()=>{
            res.send(idLine);
        })
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
        loginModule.findLoginWithZoneNRole(req.body.idZone, 2).then((zoneAdminLogin) =>{
            loginModule.updateLoginZoneAdminFromModal(zoneAdminLogin, req.body).then((zoneLogin) =>{
                personContactModule.findPersonContactWithZone(req.body.idZone).then((personContact) =>{
                    personContactModule.updatePersonContact(personContact, req.body).then((personContactChanged) =>{
                        loginModule.findLoginWithZoneNRole(req.body.idZone, 3).then((busDriverLogin) =>{
                            loginModule.updateLoginBusDriverFromModal(busDriverLogin, req.body).then((busLogin) =>{
                                res.send(busLogin);
                            })
                        })
                    })
                })
            })
        })
    })
});

module.exports = router;