var models = require('../models');

module.exports={

    insertPersonContact(body){
        return new Promise(function(resolve, reject){
            models.PersonContact.create({
                lastName: body.lastName,
                firstName: body.firstName,
                email: body.email,
                telephon: body.telephon
            }).then(function (personcontact) {
                resolve(personcontact) // c'est ce qu'il va se passer si c'est juste
            })
        })
    },

    insertZone(body, personcontact){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                zoneName: body.zoneName,
                id_personContact: personcontact.id
            }).then(function(zone){
                resolve(zone)
            })
        })
    },

    insertLoginFromSuperAdmin(body, zone){
        return new Promise(function(resolve, reject){
            models.Login.create({
                username: body.username,
                password: body.password,
                id_zone: zone.id,
                id_role: '2' // ICI IL FAUDRA METTRE LE BON ID: ROLE = ZONE ADMIN
            }).then(function(login){
                resolve(login)
            })
        })
    },

    insertLoginFromZoneAdmin(body, zone){
        return new Promise(function(resolve, reject){
            models.Login.create({
                username: body.username,
                password: body.password,
                id_zone: zone.id,
                id_role: '3' // ICI IL FAUDRA METTRE LE BON ID: ROLE = BUS DRIVER
            }).then(function(login){
                resolve(login)
            })
        })
    },

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

    insertDate(body){
        return new Promise(function(resolve, reject){
            models.Date.create({
                day: body.date,
                month: body.month,
                year: body.year
            }).then(function(date){
                resolve(date)
            })
        })
    },

    insertJourney(body, line){
        return new Promise(function(resolve, reject){
            models.Journey.create({
                journeyNumber: body.journeyNumber,
                bus: body.bus,
                id_line: line.id
            }).then(function(journey){
                resolve(journey)
            })
        })
    },

    insertLine(body, zone){
        return new Promise(function(resolve, reject){
            models.Line.create({
                lineName: body.lineName,
                fromStation: body.fromStation,
                toStation: body.toStation,
                id_zone: zone.id
            }).then(function(line){
                resolve(line)
            })
        })
    },

    insertStation(body){
        return new Promise(function(resolve, reject){
            models.Station.create({
                stationName: body.stationName,
                stopId: body.stopId
            }).then(function(station){
                resolve(station)
            })
        })
    },

    insertRole(body){
        return new Promise(function(resolve,reject){
            models.Role.create({
                roleName: body.roleName
            }).then(function(role){
                resolve(station)
            })
        })
    },
    insertJourneyReservation(journey, reservation){
        return new Promise(function(resolve, reject){
            models.JourneyReservation.create({
                id_reservation: reservation.id,
                id_journey: journey.id
            }).then(function(journeyreservation){
                resolve(journeyreservation)
            })
        })
    },

    insertLineStation(station, line){
        return new Promise(function(resolve, reject){
            models.LineStation.create({
                id_line: line.id,
                id_station: stations.id
            }).then(function(linestation){
                resolve(linestation)
            })
        })
    }

}
