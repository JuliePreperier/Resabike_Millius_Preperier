var express = require('express');
var router = express.Router();
var emailModule = require('../modules/email');
var stationModule = require('../modules/station');
var apiModule = require('../modules/apiJourneyReturnClient');
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

//GET Page about
router.get('/client_about', function(req, res, next) {
    res.render('client_about');
});

//GET Page contact
router.get('/client_contact', function(req, res, next) {
    res.render('client_contact');
});

router.get('/completion/input=:input', function(req, res, next){
    var nomStation = req.params.input;
    stationModule.findStations(nomStation).then((stations) =>{
        res.json(stations);
    });
});

/* Request the API to find all the connections possible the client ask with a from, to, date and time*/
router.post('/client_horaire', function(req,res,next){
    apiModule.searchLine(req.body).then((stations) =>{
        res.render('client_horaire', {stations: stations});
    })
});

/* Is activated when the client click on a "reserve" button, when he choose a connection */
router.post('/client_formulaire', function(req, res, next){
    var from = req.body.from;
    var to = req.body.to;
    var departure = req.body.departure;

    /* search the from station, if the return is null, redirect to the client_horaire page with an error message*/
    stationModule.getOneStationByName(from).then((fromStation) =>{
        if(fromStation !== null){
            /* search the to station, if the return is null, redirect to the client_horaire page with an error message*/
            stationModule.getOneStationByName(to).then((toStation) =>{
                if(toStation !== null){
                    /* Check if the two stations are in the same zone (return a boolean) when ok render the next page, when not redirect with an error message*/
                    stationModule.checkZoneOfStation(fromStation.stationLineStation, toStation.stationLineStation).then((okZone)=>{
                        if(okZone === true){
                            res.render('client_formulaire', {from:from, to:to, departure:departure});
                        }
                        else{
                            res.render('client_horaire', {stations: stations, messageErreur: "Il n'est pas possible de réserver dans plusieurs zones"});
                        }
                    })
                }
                else{
                    res.render('client_horaire', {stations: stations, messageErreur: "La station d'arrivée entrée ne fait pas partie du projet Resabike"});
                }
            })
        }
        else{
            res.render('client_horaire', {stations: stations, messageErreur: "La station de départ entrée ne fait pas partie du projet Resabike"});
        }
    })

});

/* This method is executed when the client click on the reserve button in the client_formulaire view. */
router.post('/client_confirmation', function(req, res, next){
    /* We tak all information from request to use it in the cascade method below
    *  We has to do it because some information were in only one variable (like departure contains date, time, day, month and year)*/
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

    /* Here there is an api search to get all line of the journey asked by the client (le number of legs determine the number of line) */
    apiModule.searchLineComp(from, to, date, time).then((connections)=>{
        connections[0].legs.forEach((leg) =>{
            /* if the leg does not contains an argument stops, that means that the leg is not a line that we need to save*/
            if(leg.stops !== null){
                /* we search le line with the name that is in the line argument of the api, find or Create a new journey, find or create a date, create the reservation
                *  create the join table, find the personContact for the email, get the reservation that was juste created for the mail recapitulatif
                *  create the email text with all info and send mail*/
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