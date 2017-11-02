var express = require('express');
var router = express.Router();

//GET Réservations
router.get('/login', function(req, res, next) {
    res.render('login');
});

//A faire POST pour login avec méthode findLogin()


module.exports = router;