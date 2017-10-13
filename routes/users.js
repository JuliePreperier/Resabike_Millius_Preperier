var express = require('express');
var bcrypt = require('bcrypt'); //pour sécurisation password
var router = express.Router();
var modules = require('../modules');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Login handler */
router.post('/login', function(req, res, next) {
    let username = req.body.login;

    //Voir comment récupérer la const ci-dessous pour login
    modules.Login.findOne({where: {login: username}}).then((user)=>{
        if(user !== null){
          //voir si on crée un password_hash
            bcrypt.compare(req.body.password, user.password_hash).then((correct)=> {
                if(correct){
                    req.session.authenticated = true;
                    req.session.user = user;
                    res.redirect('/todos');
                }else{
                    res.redirect('/login');
                }
            });
        }else{
            res.redirect('/');
        }
    });


});


module.exports = router;
