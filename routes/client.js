var express = require('express');
var router = express.Router();
var email = require('../modules/email');
var stationModule = require('../modules/station');

//GET Page horaires
router.get('/client_horaire', function(req, res, next) {
    res.render('client_horaire');
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
        email.sendEmail(req.body.to, 'Confirmation provisoire de réservation', text);
        console.log('Email envoyé');
    })
});


router.get('/completion/input=:input', function(req, res, next){
    var nomStation = req.params.input;
    stationModule.findStations(nomStation).then((stations) =>{
        res.json(stations);
    });
});

module.exports = router;