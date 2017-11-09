var models = require('../models');

module.exports= {
    /* -- RESERVATION METHOD --*/

    /* Create a new reservation in th DB --> default: isconfirmed = 0*/
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

    /* Delete a reservation with its id*/
    deleteReservation(idReservation) {
        return new Promise(function (resolve, reject) {
            models.Reservation.destroy({
                where: {id_reservation: idReservation}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    /* When a zone admin accept a reservation, it update the column isConfirmed to 1 and find the changed reservation and return it including
       the date, journeyReservation and journey to send the email*/
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

    /* Find a reservation and return it including the date, journeyReservation and journey to send the email with a complete body in parameter*/
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

    /* Find a reservation and return it including the date, journeyReservation and journey to send the email with a idReservation in parameter*/
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