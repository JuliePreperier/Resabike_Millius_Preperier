var models = require('../models');

module.exports= {

    /* -- LINE --*/

    insertLine(body, zone) {
        return new Promise(function (resolve, reject) {
            models.Line.create({
                lineName: body.lineName,
                fromStation: body.fromStation,
                toStation: body.toStation,
                id_zone: zone.id
            }).then(function (line) {
                resolve(line)
            })
        })
    },

    deleteLine(body) {
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where: {id: body.id}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    updateLine(body) {
        return new Promise(function (resolve, reject) {
            models.Line.update({
                    lineName: body.lineName,
                    fromStation: body.fromStation,
                    toStation: body.toStation
                },
                {where: {id: body.id}}
            )
        })
    }
}