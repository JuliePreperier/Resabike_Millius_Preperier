var models = require('../models');

module.exports= {
    /* -- STATION --*/

    insertStation(body){
        return new Promise(function(resolve, reject){
            models.Station.create({
                stationName: body.stationName,
                stopId: body.stopId
            }).then(function(station){
                resolve(station)
            })
        })
    },

    deleteStation(body){
        return new Promise(function(resolve, reject){
            models.Station.destroy({
                where:{id: body.id}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateStation(body){
        return new Promise(function(resolve, reject){
            models.Station.update({
                    stationName: body.stationName,
                    stopId: body.stopId},
                {where:{id: body.id}}
            )
        })
    }
}