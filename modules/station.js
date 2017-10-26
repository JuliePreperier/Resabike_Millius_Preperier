var models = require('../models');
var lineStationModule = require('../modules/lineStation');

module.exports= {
    /* -- STATION --*/

    insertStation(body){
        return new Promise(function(resolve, reject){
            models.Station.create({
                stationName: body.name,
                stopId: body.stopid
            }).then(function(station){
                resolve(station)
            })
        })
    },

    insertFindOrCreateStation(body){
        return new Promise(function(resolve, reject){
            models.Station.findOrCreate({
                where: {
                    stationName: body.name
                },
                defaults: {
                    stopId: body.stopid
                }
            }).then(function(station){
                resolve(station)
            })
        })
    },

    deleteStation(body){
        return new Promise(function(resolve, reject){
            models.Station.destroy({
                where:{id_station: body.id_station}
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
                {where:{id_station: body.id_station}}
            ).then(function(station){
                resolve(station)
            })
        })
    },

    getOneStation(body){
        return new Promise(function (resolve, reject){
            models.Station.findOne({
                where: {
                    id_station: body.id_station
                }
            }).then(function(station){
                resolve(station)
            })
        })
    },

    getAllStation(){
        return new Promise(function (resolve, reject){
            models.Station.findAll().then(function(stations){
                resolve(stations)
            })
        })
    }
}