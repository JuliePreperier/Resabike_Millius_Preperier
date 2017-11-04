var express = require('express');
var router = express.Router();

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


module.exports = router;