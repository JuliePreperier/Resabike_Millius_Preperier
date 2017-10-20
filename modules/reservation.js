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
                id_date: date.id
            }).then(function(reservation){
                resolve(reservation)
            })
        })
    },

    deleteReservation(body){
        return new Promise(function(resolve, reject){
            models.Reservation.destroy({
                where:{id: body.id}
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
                    id_date: body.date.id},
                {where:{id: body.id}}
            )
        })
    }
}