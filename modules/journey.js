var models = require('../models');

module.exports= {
    /* -- JOURNEY --*/

    insertJourney(body, line){
        return new Promise(function(resolve, reject){
            models.Journey.create({
                journeyNumber: body.journeyNumber,
                bus: body.bus,
                id_line: line.id_line
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
                    bus: body.bus},
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
    }
}