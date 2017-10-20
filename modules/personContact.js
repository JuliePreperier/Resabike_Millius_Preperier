var models = require('../models');

module.exports= {

    /* -- PERSONCONTACT --*/

    insertPersonContact(body) {
        return new Promise(function (resolve, reject) {
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

    deletePersonContact(body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.destroy({
                where: {id: body.id}
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
                {where: {id: body.id}}
            )
        })
    }
}