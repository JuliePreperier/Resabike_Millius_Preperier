var models = require('../models');

module.exports= {

    /* -- DATE --*/

    insertDate(body) {
        return new Promise(function (resolve, reject) {
            models.Date.create({
                day: body.date,
                month: body.month,
                year: body.year
            }).then(function (date) {
                resolve(date)
            })
        })
    },

    deleteDate(body) {
        return new Promise(function (resolve, reject) {
            models.Date.destroy({
                where: {id_date: body.id_date}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    updateDate(body) {
        return new Promise(function (resolve, reject) {
            models.Date.update({
                    day: body.date,
                    month: body.month,
                    year: body.year
                },
                {where: {id_date: body.id_date}}
            ).then(function (date) {
                resolve(date)
            })
        })
    }
}