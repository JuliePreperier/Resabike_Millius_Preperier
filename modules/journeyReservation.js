var models = require('../models');

module.exports= {


    /* -- JOURNEYRESERVATION --*/

    insertJourneyReservation(journey, reservation) {
        return new Promise(function (resolve, reject) {
            models.JourneyReservation.create({
                id_reservation: reservation.id,
                id_journey: journey.id
            }).then(function (journeyreservation) {
                resolve(journeyreservation)
            })
        })
    },

    deleteJourneyReservation(body) {
        return new Promise(function (resolve, reject) {
            models.JourneyReservation.destroy({
                where: {id_reservation: body.id_reservation, id_journey: body.id_journey}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    }
}