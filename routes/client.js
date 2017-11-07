var express = require('express');
var router = express.Router();
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


router.get('/completion/input=:input', function(req, res, next){
    var nomStation = req.params.input;
    stationModule.findStations(nomStation).then((stations) =>{
        res.json(stations);
    });
});

module.exports = router;