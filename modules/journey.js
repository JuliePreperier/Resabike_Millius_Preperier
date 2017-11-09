var models = require('../models');

module.exports= {

    /* -- JOURNEY METHOD --*/

    /*To search in the DB if the journey already exist. If not, create a new entry*/
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

    /* Return all Journey in the database with their lines (include) --> to have a complex object*/
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
    },

    /* delete all the journey in the DB that have the same id_line than the parameter*/
    deleteJourneyWithLine(idLine) {
        return new Promise(function (resolve, reject) {
            models.Journey.destroy({
                where: {id_line: idLine}
            }).then(function (nbRow) {
                resolve(nbRow) //return the number of row that was deleted
            })
        })
    },
}