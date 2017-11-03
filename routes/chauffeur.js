var express = require('express');
var router = express.Router();
var journeyReservationModule = require('../modules/journeyReservation');

//GET Réservations
router.get('/chauffeur', function(req, res, next) {
    var date = new Date();
    var reservationList = new Array();
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        zoneToReservations.forEach((zoneToReservation) =>{
            if(zoneToReservation.reservationJourneyReservation.dateReservation.year > date.getFullYear()){
                if(zoneToReservation.reservationJourneyReservation.isConfirmed === true){
                    reservationList.push(zoneToReservation)
                }
            }
            else if(zoneToReservation.reservationJourneyReservation.dateReservation.year = date.getFullYear()){
                if(zoneToReservation.reservationJourneyReservation.dateReservation.month > date.getMonth()){
                    if(zoneToReservation.reservationJourneyReservation.isConfirmed === true){
                        reservationList.push(zoneToReservation)
                    }
                }
                else if(zoneToReservation.reservationJourneyReservation.dateReservation.month = date.getMonth()){
                    if(zoneToReservation.reservationJourneyReservation.dateReservation.day >= date.getDay()){
                        if(zoneToReservation.reservationJourneyReservation.isConfirmed === true){
                            reservationList.push(zoneToReservation)
                        }
                    }
                }
            }
        })
    }).then(() =>{
        res.render('chauffeur',{zoneToReservations: reservationList});
        //reservationList.push(zoneToReservation)
    })
});


module.exports = router;