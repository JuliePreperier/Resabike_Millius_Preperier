var models = require('../models');

module.exports= {
    /* -- LOGIN --*/

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

    deleteLogin(body){
        return new Promise(function(resolve, reject){
            models.Login.destroy({
                where:{id: body.id}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateLogin(body){
        return new Promise(function(resolve, reject){
            models.Login.update({
                    username: body.username,
                    password: body.password,
                    id_zone: body.zone.id},
                {where:{id: body.id}}
            )
        })
    }
}