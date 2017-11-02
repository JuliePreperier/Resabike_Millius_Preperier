var express = require('express');
var router = express.Router();
var journeyReservationModule = require('../modules/journeyReservation');

//GET Réservations
router.get('/chauffeur', function(req, res, next) {
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        res.render('chauffeur',{zoneToReservations: zoneToReservations});
    })
});


module.exports = router;