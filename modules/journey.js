var models = require('../models');

module.exports= {
    /* -- JOURNEY --*/

    insertJourney(body, line){
        return new Promise(function(resolve, reject){
            models.Journey.create({
                journeyNumber: body.journeyNumber,
                bus: body.bus,
                id_line: line.id
            }).then(function(journey){
                resolve(journey)
            })
        })
    },

    deleteJourney(body){
        return new Promise(function(resolve, reject){
            models.Journey.destroy({
                where:{id: body.id}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateJourney(body){
        return new Promise(function(resolve, reject){
            models.Date.update({
                    journeyNumber: body.journeyNumber,
                    bus: body.bus},
                {where:{id: body.id}}
            )
        })
    }
}