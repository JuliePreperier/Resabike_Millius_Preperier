var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', (req,res,next) =>{
    res.render('zone'); // nom du pug
});

/* POST new zone */
router.post('/', (req, res, next) => {

    res.redirect('/todos');
});