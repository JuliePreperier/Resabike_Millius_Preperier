var express = require('express');
var router = express.Router();
var journeyReservationModule = require('../modules/journeyReservation');

//GET All confirmed reservations in the zone of the bus driver
router.get('/chauffeur', function(req, res, next) {
    var date = new Date();
    var reservationList = new Array();

    /* In this method we get all reservation that exist including all table the info in table zone, line, journey, journeyReservation and Date
    * After we do a forEach loop on the object and filter it to get only the reservation we want*/
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        zoneToReservations.forEach((zoneToReservation) =>{
            /* The if else, check if the reservation il not already passed (date in the past)*/
            if(zoneToReservation.journeyJourneyReservation.journeyLine.zoneLine.id_zone === req.session.user.id_zone) {
                if (zoneToReservation.reservationJourneyReservation.dateReservation.year > date.getFullYear()) {
                    // check if the reservation is confirmed
                    if (zoneToReservation.reservationJourneyReservation.isConfirmed === true) {
                        reservationList.push(zoneToReservation)
                    }
                }
                else if (zoneToReservation.reservationJourneyReservation.dateReservation.year = date.getFullYear()) {
                    if (zoneToReservation.reservationJourneyReservation.dateReservation.month > date.getMonth()) {
                        if (zoneToReservation.reservationJourneyReservation.isConfirmed === true) {
                            reservationList.push(zoneToReservation)
                        }
                    }
                    else if (zoneToReservation.reservationJourneyReservation.dateReservation.month = date.getMonth()) {
                        if (zoneToReservation.reservationJourneyReservation.dateReservation.day >= date.getDay()) {
                            if (zoneToReservation.reservationJourneyReservation.isConfirmed === true) {
                                reservationList.push(zoneToReservation)
                            }
                        }
                    }
                }
            }
        })
    }).then(() =>{
        /*Security access. If the session.user has an id_role equals to 3 (bus driver) he can go to the page else he's redirected to the login page*/
        if(req.session.user.id_role === 3){
            res.render('chauffeur',{zoneToReservations: reservationList});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/login');
        }
    })
});


module.exports = router;