var models = require('../models');

module.exports= {
    /* -- RESERVATION --*/

    createReservation(firstName, lastName, telephon, email, numberBikes, groupName, from, remarks,  to,  idDate){
        return new Promise(function(resolve, reject){
            models.Reservation.create({
                firstName: firstName,
                lastName: lastName,
                telephon: telephon,
                email: email,
                numberBikes: numberBikes,
                groupName: groupName,
                from: from,
                to: to,
                remarks: remarks,
                isConfirmed: 0,
                id_date: idDate
            }).then(function(reservation){
                resolve(reservation)
            })
        })
    },

    deleteReservation(idReservation) {
        return new Promise(function (resolve, reject) {
            models.Reservation.destroy({
                where: {id_reservation: idReservation}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    acceptReservation(body){
        return new Promise(function(resolve, reject){
            models.Reservation.update({
                    isConfirmed: body.isConfirmed},
                {where:{id_reservation: body.idReservation}}
            ).then((id_res) =>{
                models.Reservation.findOne({
                    where: {
                        id_reservation: body.idReservation
                    },
                    include:[{
                        model: models.Date,
                        as: "dateReservation"
                    },
                        {model: models.JourneyReservation,
                        as: "reservationJourneyReservation",
                        include: [{
                            model: models.Journey,
                            as: "journeyJourneyReservation"
                        }]}]

                }).then((reservation) =>{
                    resolve(reservation)
                })
            })
        })
    },

    getOneReservationWithInclude(body){
        return new Promise(function(resolve, reject){
            models.Reservation.findOne({
                where: {
                    id_reservation: body.id_reservation
                },
                include:[{
                    model: models.Date,
                    as: "dateReservation"
                },
                    {model: models.JourneyReservation,
                        as: "reservationJourneyReservation",
                        include: [{
                            model: models.Journey,
                            as: "journeyJourneyReservation"
                        }]}]

            }).then((reservation) =>{
                resolve(reservation)
            })
        })
    },

    getOneReservationWithIncludeForConf(idReservation){
        return new Promise(function(resolve, reject){
            models.Reservation.findOne({
                where: {
                    id_reservation: idReservation
                },
                include:[{
                    model: models.Date,
                    as: "dateReservation"
                },
                    {model: models.JourneyReservation,
                        as: "reservationJourneyReservation",
                        include: [{
                            model: models.Journey,
                            as: "journeyJourneyReservation"
                        }]}]

            }).then((reservation) =>{
                resolve(reservation)
            })
        })
    }
}