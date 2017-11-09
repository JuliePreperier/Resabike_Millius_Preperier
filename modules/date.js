var models = require('../models');

module.exports= {

    /* -- DATE --*/

    findOrCreateDate(day, month, year) {
        return new Promise(function (resolve, reject) {
            models.Date.findOrCreate({
                where: {
                    day: day,
                    month: month,
                    year: year
                },
                defaults: {
                    day: day,
                    month: month,
                    year: year
                }
            }).then(function (date) {
                resolve(date)
            })
        })
    }

}