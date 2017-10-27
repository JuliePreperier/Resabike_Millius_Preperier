var models = require('../models');

module.exports= {
    /* -- LINESTATION --*/

    insertLineStation(station, line){
        return new Promise(function(resolve, reject){
            models.LineStation.create({
                id_line: line[0].id_line,
                id_station: station[0].id_station
            }).then(function(linestation){
                resolve(linestation)
            })
        })
    },

    deleteLineStationWithLine(idLine){
        return new Promise(function(resolve, reject){
            models.LineStation.destroy({
                where:{id_line: idLine}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    deleteLineStationWithStation(idStation){
        return new Promise(function(resolve, reject){
            models.LineStation.destroy({
                where:{id_station: idStation}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    }
}