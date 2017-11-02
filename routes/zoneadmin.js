var express = require('express');
var router = express.Router();var zoneModule = require('../modules/zone');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');
var loginModule = require('../modules/login');
var personContactModule = require('../modules/personContact');
var journeyReservationModule = require('../modules/journeyReservation');
var reservationModule = require('../modules/reservation');

/* GET zoneAdmin page . */

router.get('/zoneadmin_lignes', (req,res,next)=>{
    lineModule.findLineWithZone(1).then((lines) => { // PRENDRE LA ZONE DU ZONE ADMIN DANS LE SESSION !!!
        res.render('zoneadmin_lignes',{lines: lines});
    })
});

//GET informations
router.get('/zoneadmin_informations', (req,res,next)=>{
    personContactModule.findPersonContactWithZone(1).then((personContact) => { // PRENDRE LA ZONE DU ZONE ADMIN DANS LE SESSION !!!
        loginModule.findLoginWithZoneNRole(1,3).then((login) => {
            res.render('zoneadmin_informations',{personContact : personContact, login: login});
        })
    })
});

//GET Réservations
router.get('/zoneadmin_reservations', function(req, res, next) {
    var reservations = new Array();
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        zoneToReservations.forEach((zoneToReservation) =>{
            if(zoneToReservation.journeyJourneyReservation.journeyLine.zoneLine.id_zone === 1){
                reservations.push(zoneToReservation);
            }
        })
    }).then(() =>{
        res.render('zoneadmin_reservations',{reservations: reservations});
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
                                    res.redirect('/zoneadmin/zoneadmin_lignes')
                                })
                            })
                        })
                    })
                })
            }
            else{
                alert('Les multi-lignes ne sont pas gérés. Veuillez entrer des stations se trouvant dans une seule ligne');
            }
        })
    })
});

/*Update Bus driver login*/
router.put('/zoneadmin_informations/login',(req, res) =>{
    loginModule.updateLogin(req.body).then((busLogin) =>{
        res.send(busLogin);
    })
});

/*Update PersonContact*/
router.put('/zoneadmin_informations/personContact',(req, res) =>{
    personContactModule.updateContact(req.body).then((personContact) =>{
        res.send(personContact);
    })
});

/*DELETE line*/
router.delete('/zoneadmin_lignes',(req, res)=>{
    let idLine = req.body.id_line;
    lineModule.deleteLine(idLine).then(() =>{
        lineStationModule.deleteLineStationWithLine(idLine)
    }).then(()=>{
        res.send(idLine);
    })
});

/*Update Reservation*/
router.put('/zoneadmin_reservations',(req, res) =>{
    reservationModule.acceptReservation(req.body).then(() =>{
        res.send(reservation);
    })
});

/*DELETE reservation*/
router.delete('/zoneadmin_reservation',(req, res)=>{
    let idLine = req.body.id_line;
    lineModule.deleteLine(idLine).then(() =>{
        lineStationModule.deleteLineStationWithLine(idLine)
    }).then(()=>{
        res.send(idLine);
    })
});

module.exports = router;