var models = require('../models');

module.exports= {


    /* -- JOURNEYRESERVATION --*/

    getAllFromZoneToReservation(){
      return new Promise(function(resolve, reject){
          models.JourneyReservation.findAll({
              include: [{
                  model: models.Reservation,
                  as: 'reservationJourneyReservation',
                  include: [{
                      model: models.Date,
                      as: 'dateReservation'
                  }]
              },{
                  model: models.Journey,
                  as: 'journeyJourneyReservation',
                  include: [{
                      model: models.Line,
                      as: 'journeyLine',
                      include: [{
                          model: models.Zone,
                          as: 'zoneLine'
                      }]
                  }]
              }]
          }).then(function(zoneToReservations){
              resolve(zoneToReservations)
          })
      })
    },


    findJourneyWithZoneInclude(idJourney){
        return new Promise(function (resolve, reject){
            models.JourneyReservation.findAll({
                where: {
                    id_journey: idJourney
                },
                include: [{
                    model: models.Reservation,
                    as: 'reservationJourneyReservation',
                    include: [{
                        model: models.Date,
                        as: 'dateReservation'
                    }]
                }]
            }).then(function(Reservations){
                resolve(Reservations)
            })
        })
    },


    insertJourneyReservation(journey, reservation) {
        return new Promise(function (resolve, reject) {
            models.JourneyReservation.create({
                id_reservation: reservation.id_reservation,
                id_journey: journey.id_journey
            }).then(function (journeyreservation) {
                resolve(journeyreservation)
            })
        })
    },



    deleteJourneyResWithReservation(idReservation) {
        return new Promise(function (resolve, reject) {
            models.JourneyReservation.destroy({
                where: {id_reservation: idReservation}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

}