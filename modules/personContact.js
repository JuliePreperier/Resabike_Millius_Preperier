var models = require('../models');

module.exports= {

    /* -- PERSONCONTACT --*/

    insertEmptyPersonContact(zone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                lastName: '',
                firstName: '',
                email: '',
                telephon: '',
                id_zone: zone.id_zone
            }).then(function (personcontact) {
                resolve(personcontact) // c'est ce qu'il va se passer si c'est juste
            })
        })
    },

    deletePersonContactWithZone(idZone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.destroy({
                where: {id_zone: idZone}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    updatePersonContact(personContactToChanged, body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.update({
                    lastName: body.lastName,
                    firstName: body.firstName,
                    email: body.email,
                    telephon: body.telephon
                },
                {where: {id_personContact: personContactToChanged.id_personContact}}
            ).then(function(personContact){
                resolve(personContact)
            })
        })
    },

    updateContact(body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.update({
                    lastName: body.lastname,
                    firstName: body.firstname,
                    email: body.email,
                    telephon: body.telephon
                },
                {where: {id_personContact: body.idPersonContact}}
            ).then(function(personContact){
                resolve(personContact)
            })
        })
    },

    findPersonContactWithZone(idZone){
        return new Promise(function (resolve, reject){
            models.PersonContact.findOne({
                where: {
                    id_zone: idZone
                }
            }).then(function(personContact){
                resolve(personContact)
            })
        })
    }
}