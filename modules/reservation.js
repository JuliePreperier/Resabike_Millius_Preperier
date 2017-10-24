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

    deleteReservation(body){
        return new Promise(function(resolve, reject){
            models.Reservation.destroy({
                where:{id_reservation: body.id_reservation}
            }).then(function(nbRow){
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