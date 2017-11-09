var express = require('express');
var router = express.Router();
var emailModule = require('../modules/email');
var stationModule = require('../modules/station');
var apiModule = require('../modules/apiJourneyReturnClient');
var stationLineModule = require('../modules/lineStation');
var lineModule = require('../modules/line');
var journeyModule = require('../modules/journey');
var dateModule = require('../modules/date');
var reservationModule = require('../modules/reservation');
var journeyReservationModule = require('../modules/journeyReservation');
var personContactModule = require('../modules/personContact');



var stations ={};
//GET Page horaires
router.get('/client_horaire', function(req, res, next) {
    res.render('client_horaire', {stations: stations, messageErreur:''});
});

//GET Page formulaire
router.get('/client_formulaire', function(req, res, next) {
    res.render('client_formulaire');
});

//GET Page confirmation
router.get('/client_confirmation', function(req, res, next) {
    res.render('client_confirmation');
});

//Method to send an automatic email when the client has made a reservation.
router.post('/email', function(req, res, next){
    email.createTextConfirmer().then((text) =>{
        email.sendEmail(req.body.to, 'Confirmation provisoire / Provisional confirmation / Vorläufige Bestätigung', text);
        console.log('Email envoyé');
    })
});


router.get('/completion/input=:input', function(req, res, next){
    var nomStation = req.params.input;
    stationModule.findStations(nomStation).then((stations) =>{
        res.json(stations);
    });
});

router.post('/client_horaire', function(req,res,next){
    apiModule.searchLine(req.body).then((stations) =>{
        res.render('client_horaire', {stations: stations});
    })
});

router.post('/client_formulaire', function(req, res, next){
    var from = req.body.from;
    var to = req.body.to;
    var departure = req.body.departure;

    stationModule.getOneStationByName(from).then((fromStation) =>{
        stationModule.getOneStationByName(to).then((toStation) =>{
            stationModule.checkZoneOfStation(fromStation.stationLineStation, toStation.stationLineStation).then((okZone)=>{
                if(okZone === true){
                    res.render('client_formulaire', {from:from, to:to, departure:departure});
                }
                else{
                    res.render('client_horaire', {stations: stations, messageErreur: "Il n'est pas possible de réserver dans plusieurs zones"});
                }
            })
        })
    })

});

router.post('/client_confirmation', function(req, res, next){
    var date = req.body.departure.substr(8,2)+'.'+req.body.departure.substr(5,2)+'.'+req.body.departure.substr(0,4);
    var time = req.body.departure.substr(11,5);
    var from = req.body.from;
    var to = req.body.to;
    var lastname = req.body.lastName;
    var firstName = req.body.firstName;
    var telephon = req.body.telephon;
    var email = req.body.email;
    var nbBike = req.body.nbBikes;
    var day = req.body.departure.substr(8,2);
    var month = req.body.departure.substr(5,2);
    var year = req.body.departure.substr(0,4);
    var remarks = req.body.remarks;
    var groupName = req.body.groupName;

    apiModule.searchLineComp(from, to, date, time).then((connections)=>{
        connections[0].legs.forEach((leg) =>{
            if(leg.stops !== null){
                lineModule.getOneLineWithName(leg.line).then((line) =>{
                    journeyModule.findOrCreateJourney(leg.number, time, line.id_line).then((journey) =>{
                        dateModule.findOrCreateDate(day,month,year).then((date) =>{
                            reservationModule.createReservation(firstName,lastname,telephon,email,nbBike,groupName,leg.name,remarks,leg.terminal,date[0].id_date).then((reservation) =>{
                                journeyReservationModule.insertJourneyReservation(journey[0].dataValues.id_journey, reservation.id_reservation).then((journeyReservation) =>{
                                    personContactModule.findPersonContactWithZone(line.id_zone).then((personContact)=>{
                                        reservationModule.getOneReservationWithIncludeForConf(reservation.id_reservation).then((reservationInclude) =>{
                                            emailModule.createTextConfirmer(reservationInclude.dataValues,personContact.dataValues).then((text)=>{
                                                emailModule.sendEmail(reservation.email, 'Confirmation réservation / Booking confirmation / Buchung Bestätigung', text).then(()=>{
                                                    res.render('client_confirmation');
                                                });
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    })

})

module.exports = router;