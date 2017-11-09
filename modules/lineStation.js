var models = require('../models');

module.exports= {
    /* -- LINESTATION METHOD--*/

    /* Create a new entry in the DB*/
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

    /* Delete entry in the DB that response to the id put in parameters*/
    deleteLineStationWithLine(idLine){
        return new Promise(function(resolve, reject){
            models.LineStation.destroy({
                where:{id_line: idLine}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    }

}