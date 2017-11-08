var models = require('../models');

module.exports= {
    /* -- JOURNEY --*/

    insertJourney(body, line){
        return new Promise(function(resolve, reject){
            models.Journey.create({
                journeyNumber: body.journeyNumber,
                horaire: body.horaire,
                id_line: line.id_line
            }).then(function(journey){
                resolve(journey)
            })
        })
    },

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

    deleteJourney(body){
        return new Promise(function(resolve, reject){
            models.Journey.destroy({
                where:{id_journey: body.id_journey}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateJourney(body){
        return new Promise(function(resolve, reject){
            models.Journey.update({
                    journeyNumber: body.journeyNumber,
                    horaire: body.horaire},
                {where:{id_journey: body.id_journey}}
            ).then(function(journey){
                resolve(journey)
            })
        })
    },

    getOneJourney(body){
        return new Promise(function (resolve, reject){
            models.Journey.findOne({
                where: {
                    id_journey: body.id_journey
                }
            }).then(function(journey){
                resolve(journey)
            })
        })
    },

    getAllJourney(){
        return new Promise(function (resolve, reject){
            models.Journey.findAll().then(function(journeys){
                resolve(journeys)
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
    }
}