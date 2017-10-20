var models = require('../models');

module.exports= {
    /* -- LINESTATION --*/

    insertLineStation(station, line){
        return new Promise(function(resolve, reject){
            models.LineStation.create({
                id_line: line.id,
                id_station: stations.id
            }).then(function(linestation){
                resolve(linestation)
            })
        })
    },

    deleteLineStation(body){
        return new Promise(function(resolve, reject){
            models.LineStation.destroy({
                where:{id_line: body.id_line, id_station: body.id_station}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    }
}