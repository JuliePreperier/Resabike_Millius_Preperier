var models = require('../models');

module.exports= {

    /* -- ROLE --*/

    insertRole(body) {
        return new Promise(function (resolve, reject) {
            models.Role.create({
                roleName: body.roleName
            }).then(function (role) {
                resolve(station)
            })
        })
    },

    deleteRole(body) {
        return new Promise(function (resolve, reject) {
            models.Role.destroy({
                where: {id: body.id}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    updateRole(body) {
        return new Promise(function (resolve, reject) {
            models.Role.update({
                    roleName: body.roleName
                },
                {where: {id: body.id}}
            )
        })
    }
}