var express = require('express');
var router = express.Router();
var loginModule = require('../modules/login');

//GET Réservations
router.get('/login', function(req, res, next) {
    res.render('login');
    req.session.authenticated = false;
});

//A faire POST pour login avec méthode findLogin()
router.post('/login', function(req, res, next){
    let userName = req.body.loginUsername;

    loginModule.findLoginWithUsername(userName).then((user) =>{
        if(user !== null){
            if(user.password === req.body.loginPassword){
                req.session.authenticated = true;
                req.session.user = user;
                if(user.id_role === 1){
                    res.redirect('/superadmin/superadmin_reservations');
                }
                else if(user.id_role === 2){
                    res.redirect('/zoneadmin/zoneadmin_reservations');
                }
                else if(user.id_role === 3){
                    res.redirect('/chauffeur');
                }
            }
            else{
                res.redirect('/login');
            }
        }
        else{
            res.redirect('/login');
        }
    })
});

/* Logout handler */
router.get('/login/logout', function(req, res, next) {
    req.session.destroy((err) =>{
        res.redirect('/login');
    });
});

module.exports = router;