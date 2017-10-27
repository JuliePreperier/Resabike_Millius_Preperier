var models = require('../models');

module.exports= {

    /* -- PERSONCONTACT --*/

    insertPersonContact(body, zone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                lastName: body.lastName,
                firstName: body.firstName,
                email: body.email,
                telephon: body.telephon,
                id_zone: zone.id_zone
            }).then(function (personcontact) {
                resolve(personcontact) // c'est ce qu'il va se passer si c'est juste
            })
        })
    },

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

    deletePersonContact(body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.destroy({
                where: {id_personContact: body.id_personContact}
            }).then(function (nbRow) {
                resolve(nbRow)
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

    updatePersonContact(body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.update({
                    lastName: body.lastName,
                    firstName: body.firstName,
                    email: body.email,
                    telephon: body.telephon
                },
                {where: {id_personContact: body.id_personContact}}
            ).then(function(personContact){
                resolve(personContact)
            })
        })
    },

    getOnePersonContact(body){
        return new Promise(function (resolve, reject){
            models.PersonContact.findOne({
                where: {
                    id_personContact: body.id_personContact
                }
            }).then(function(personContact){
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
    },

    getAllPersonContact(){
        return new Promise(function (resolve, reject){
            models.PersonContact.findAll().then(function(personContacts){
                resolve(personContacts)
            })
        })
    }
}