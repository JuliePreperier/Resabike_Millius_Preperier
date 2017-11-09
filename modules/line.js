var models = require('../models');

module.exports= {

    /* -- LINE --*/
    insertFindOrCreateLine(body, zone){
        return new Promise(function (resolve, reject) {
            models.Line.findOrCreate({
                where: {
                    lineName: body.legs[0].line
                },
                defaults: {
                    fromStation: body.from,
                    toStation: body.to,
                    id_zone: zone.id_zone
                }
            }).then(function (line){
                resolve(line)
            })
        })
    },

    deleteLine(idLine) {
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where: {id_line: idLine}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    deleteLineWithZone(idZone) {
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where: {id_zone: idZone}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    findLineWithZone(idZone){
        return new Promise(function (resolve, reject){
            models.Line.findAll({
                where: {
                    id_zone: idZone
                }
            }).then(function(lines){
                resolve(lines)
            })
        })
    },

    getOneLineWithName(name){
        return new Promise(function (resolve, reject){
            models.Line.findOne({
                where: {
                    lineName: name
                }
            }).then(function(line){
                resolve(line)
            })
        })
    },


    getAllLineWithZone(){
        return new Promise(function(resolve, reject){
            models.Line.findAll({
                include: [{
                    model: models.Zone,
                    as: 'zoneLine',
                    where: {
                        id_zone: {$col: 'Line.id_zone'}
                    }
                }]
            }).then(function(lines){
                resolve(lines)
            })
        })
    }

}