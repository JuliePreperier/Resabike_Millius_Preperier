var models = require('../models');
var lineStationModule = require('../modules/lineStation');

module.exports= {

    /* -- STATION METHOD--*/

    /* To search in the DB if the station already exist. If not, create a new entry*/
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

    /* Return a station that corresponds to the name in paramete*/
    getOneStationByName(name){
        return new Promise(function (resolve, reject){
            models.Station.findOne({
                where: {
                    stationName: name
                },
                include: {
                    model: models.LineStation,
                    as: 'stationLineStation',
                    include: {
                        model: models.Line,
                        as: 'lineLinestation'
                    }
                }
            }).then(function(station){
                resolve(station)
            })
        })
    },

    /* Find entries in DB that have a name like the input in parameter --> used for autoCompletion*/
    findStations(input){
        return new Promise(function(resolve, reject){
            models.Station.findAll({
                where: {
                    stationName: {$like: input+'%'}
                }
            }).then(function(stations){
                resolve(stations)
            })
        })
    },

    /* Check if the station are in the same zone or not. Return a boolean --> used in research of connection when a client do a reservation*/
    checkZoneOfStation(fromStationLineStations, toStationLineStations){
        return new Promise(function(resolve, reject){
            var okZone =false;

            fromStationLineStations.forEach((fromStationLineStation) =>{
                toStationLineStations.forEach((toStationLineStation) =>{
                    if(fromStationLineStation.lineLinestation.dataValues.id_zone === toStationLineStation.lineLinestation.dataValues.id_zone){
                        okZone=true;
                    }
                })
            })
            resolve(okZone);
        })
    }
}