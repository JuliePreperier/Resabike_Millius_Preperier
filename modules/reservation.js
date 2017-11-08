var models = require('../models');

module.exports= {
    /* -- RESERVATION --*/

    insertReservation(body, date){
        return new Promise(function(resolve, reject){
            models.Reservation.create({
                firstName: body.firstName,
                lastName: body.lastName,
                telephon: body.telephon,
                email: body.email,
                numberBikes: body.numberBikes,
                groupName: body.groupName,
                from: body.from,
                to: body.to,
                remarks: body.remarks,
                isConfirmed: body.isConfirmed,
                id_date: date.id_date
            }).then(function(reservation){
                resolve(reservation)
            })
        })
    },

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

    updateReservation(body){
        return new Promise(function(resolve, reject){
            models.Reservation.update({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    telephon: body.telephon,
                    email: body.email,
                    numberBikes: body.numberBikes,
                    groupName: body.groupName,
                    from: body.from,
                    to: body.to,
                    remarks: body.remarks,
                    isConfirmed: body.isConfirmed,
                    id_date: body.date.id_date},
                {where:{id_reservation: body.id_reservation}}
            ).then(function(reservation){
                resolve(reservation)
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
    },

    getOneReservation(body){
        return new Promise(function (resolve, reject){
            models.Reservation.findOne({
                where: {
                    id_reservation: body.id_reservation
                }
            }).then(function(reservation){
                resolve(reservation)
            })
        })
    },

    getAllReservation(){
        return new Promise(function (resolve, reject){
            models.Reservation.findAll().then(function(reservations){
                resolve(reservations)
            })
        })
    }
}