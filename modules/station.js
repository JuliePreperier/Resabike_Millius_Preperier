var models = require('../models');
var lineStationModule = require('../modules/lineStation');

module.exports= {
    /* -- STATION --*/

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