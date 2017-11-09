var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');
var loginModule = require('../modules/login');
var personContactModule = require('../modules/personContact');
var journeyReservationModule = require('../modules/journeyReservation');
var reservationModule = require('../modules/reservation');
var journeyModule = require('../modules/journey');
var email = require('../modules/email');

/* GET zoneAdmin page . */
router.get('/zoneadmin_lignes', (req,res,next)=>{
    /* to display the line in the view, we search all the line that are in the zone of the session.user*/
    lineModule.findLineWithZone(req.session.user.id_zone).then((lines) => {
        var messageErreur ='';
        if(req.session.user.id_role === 2){ // only a zone admin can access to this page
            res.render('zoneadmin_lignes',{lines: lines, messageErreur:messageErreur});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/login');
        }
    })
});

//GET informations
// It get the personContact and the busDriver login of the session.user's zone
router.get('/zoneadmin_informations', (req,res,next)=>{
    personContactModule.findPersonContactWithZone(req.session.user.id_zone).then((personContact) => {
        loginModule.findLoginWithZoneNRole(req.session.user.id_zone,3).then((login) => {
            if(req.session.user.id_role === 2){// only a zone admin can access to this page
                res.render('zoneadmin_informations',{personContact : personContact, login: login});
            }
            else{
                req.session.authenticated = false;
                res.redirect('/login');
            }

        })
    })
});

//GET Réservations
// get all reservation of the session.user's zone. It check that the reservation is not already past and display
// only the future ones.
router.get('/zoneadmin_reservations', function(req, res, next) {
    var date = new Date();
    var reservations = new Array();
    var journeysList = new Array();
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        zoneToReservations.forEach((zoneToReservation) =>{
            if(zoneToReservation.journeyJourneyReservation.journeyLine.zoneLine.id_zone === req.session.user.id_zone){
                if(zoneToReservation.reservationJourneyReservation.dateReservation.year > date.getFullYear()){
                    reservations.push(zoneToReservation);
                }
                else if(zoneToReservation.reservationJourneyReservation.dateReservation.year = date.getFullYear()){
                    if(zoneToReservation.reservationJourneyReservation.dateReservation.month > date.getMonth()){
                        reservations.push(zoneToReservation);
                    }
                    else if(zoneToReservation.reservationJourneyReservation.dateReservation.month = date.getMonth()){
                        if(zoneToReservation.reservationJourneyReservation.dateReservation.day >= date.getDay()){
                            reservations.push(zoneToReservation);
                        }
                    }
                }
            }
        })
    }).then(() =>{
        // get all journey of the reservation too to check the zone of the reservation
        journeyModule.getAllJourneyWithLine().then((journeys) =>{
            journeys.forEach((journey) =>{
                if(journey.journeyLine.id_zone === req.session.user.id_zone){
                    journeysList.push(journey);
                }
            })
        }).then(() =>{
            if(req.session.user.id_role === 2){// only a zone admin can access to this page
                res.render('zoneadmin_reservations',{reservations: reservations, journeys: journeysList});
            }
            else{
                req.session.authenticated = false;
                res.redirect('/login');
            }
        })
    })
});

/*Get NB of Bikes*/
router.get('/zoneadmin_reservations/nbBikes=:idJourney', function(req, res, next){
    var idJourney = req.params.idJourney;
    var nbBikes = 0 ;
    var date = new Date();

    /* To count the number of bikes that are in a journey, the method find all journey including the zone and line table
    *  after it check if the reservation is confirmed (we count only the bikes of confirmed reservation) and take
    *  only the future reservation (not already passed) and when we find it, add the number of bikes to our variable
    *  and return the variable in the view*/
    journeyReservationModule.findJourneyWithZoneInclude(idJourney).then((reservations) =>{
        reservations.forEach((reservation) =>{
            console.log(reservation.reservationJourneyReservation.isConfirmed);
            if(reservation.reservationJourneyReservation.dateReservation.year > date.getFullYear()){
                if(reservation.reservationJourneyReservation.isConfirmed === true){
                    nbBikes=nbBikes + reservation.reservationJourneyReservation.numberBikes;
                }
            }
            else if(reservation.reservationJourneyReservation.dateReservation.year = date.getFullYear()){
                if(reservation.reservationJourneyReservation.dateReservation.month > date.getMonth()){
                    if(reservation.reservationJourneyReservation.isConfirmed === true){
                        nbBikes=nbBikes + reservation.reservationJourneyReservation.numberBikes;
                    }
                }
                else if(reservation.reservationJourneyReservation.dateReservation.month = date.getMonth()){
                    if(reservation.reservationJourneyReservation.dateReservation.day >= date.getDay()){
                        if(reservation.reservationJourneyReservation.isConfirmed === true){
                            nbBikes=nbBikes + reservation.reservationJourneyReservation.numberBikes;
                        }
                    }
                }
            }
        })
    }).then(() =>{
        res.json(nbBikes);
    })
});


/* Same method than in the superadmin route, but the admin can not choose the zone of the line. it will automatically
* be the session.user's zone.*/
router.post('/zoneadmin_lignes', function(req,res, next){
    zoneModule.getOneZoneWithId(req.session.user.id_zone).then((zone) =>{
        apiSearch.searchLine(req.body).then((stations) =>{
            if(stations.connections[1].legs.length<=2){
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
                                    res.redirect('/zoneadmin/zoneadmin_lignes')
                                })
                            })
                        })
                    })
                })
            }
            else{
                lineModule.findLineWithZone(req.session.user.id_zone).then((lines) => {
                    res.render('zoneadmin_lignes', {
                        lines: lines,
                        messageErreur: 'Les multi-ligne ne sont pas autorisés. Veuillez entrer des stations présentes dans une seule ligne'
                    });
                })
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

/*DELETE line, journey and lineStations*/
router.delete('/zoneadmin_lignes',(req, res)=>{
    let idLine = req.body.id_line;
    journeyModule.deleteJourneyWithLine(idLine).then((nbrow) =>{
        lineModule.deleteLine(idLine).then(() =>{
            lineStationModule.deleteLineStationWithLine(idLine)
        }).then(()=>{
            res.send(idLine);
        })
    })
});

/*Update Reservation*/
router.put('/zoneadmin_reservations',(req, res) =>{
    /* because we send an email with some info, we have to search the personContact of this reservation (the one of the
    current zone. We send the "acceptResrvation" method that is in the module reservation and create text for the
    accepted email, and send the email*/
    personContactModule.findPersonContactWithZone(req.session.user.id_zone).then((personContact)=>{
        reservationModule.acceptReservation(req.body).then((reservation) =>{
            email.createTextAccepter(reservation.dataValues, personContact.dataValues).then((text) =>{
                email.sendEmail(reservation.email, 'Réservation acceptée / Booking accepted / Reservierung akzeptiert', text).then(()=>{
                    console.log("email envoyé");
                    res.send(reservation);
                });
            })
        })
    })
});


/*DELETE Reservation*/
router.delete('/zoneadmin_reservations',(req, res)=>{
    let idReservation = req.body.id_reservation;
    /* because we send an email with some info, we have to search the personContact of this reservation (the one of the
       current zone. we create the refused emal and send it and after that we delete the journeyReservation and the
       reservation*/
    personContactModule.findPersonContactWithZone(req.session.user.id_zone).then((personContact)=>{
        reservationModule.getOneReservationWithInclude(req.body).then((reservation) =>{
            email.createTextRefuser(reservation.dataValues, personContact.dataValues).then((text) =>{
                email.sendEmail(reservation.email, 'Réservation refusée / Booking denied / Reservierung abgelehnt', text).then(()=>{
                    journeyReservationModule.deleteJourneyResWithReservation(idReservation).then((nbLigne) =>{
                        reservationModule.deleteReservation(idReservation)
                    }).then((idReservation) =>{
                        res.send(idReservation);
                    })
                });
            })

        })
    })
});

module.exports = router;