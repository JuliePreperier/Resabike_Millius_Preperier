var models = require('../models');

module.exports= {
    /* -- JOURNEY --*/

    findOrCreateJourney(number, time, idLine){
        return new Promise(function(resolve, reject){
            models.Journey.findOrCreate({
                where: {
                    journeyNumber: number,
                    horaire: time,
                    id_line: idLine
                },
                defaults: {
                    journeyNumber: number,
                    horaire: time,
                    id_line: idLine
                }
            }).then(function(journey){
                resolve(journey)
            })
        })
    },

    getAllJourneyWithLine(){
        return new Promise(function(resolve, reject){
            models.Journey.findAll({
                include: [{
                    model: models.Line,
                    as: 'journeyLine'
                }]
            }).then(function(journeys){
                resolve(journeys)
            })
        })
    },

    deleteJourneyWithLine(idLine) {
        return new Promise(function (resolve, reject) {
            models.Journey.destroy({
                where: {id_line: idLine}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },
}