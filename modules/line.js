var models = require('../models');

module.exports= {

    /* -- LINE METHOD--*/

    /* To search in the DB if the line already exist. If not, create a new entry*/
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

    /* delete line that response to the id put in parameters (with id_line)*/
    deleteLine(idLine) {
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where: {id_line: idLine}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },
    /* delete line that response to the id put in parameters (with id_zone)*/
    deleteLineWithZone(idZone) {
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where: {id_zone: idZone}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    /* Get all lines that have the same id_zone that the parameter*/
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

    /* Get a line with its name*/
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

    /* Get all lines that have the same id_zone that the parameter including the zone*/
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