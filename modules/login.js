var models = require('../models');

module.exports= {
    /* -- LOGIN --*/

    insertLoginFromSuperAdmin(body, zone){
        return new Promise(function(resolve, reject){
            models.Login.create({
                username: body.username,
                password: body.password,
                id_zone: zone.id_zone,
                id_role: '2'
            }).then(function(login){
                resolve(login)
            })
        })
    },

    insertdefaultLoginDriver(zone){ // insere un login de bus driver par défaut lors de la création de la zone par le super admin
        return new Promise(function(resolve, reject){
            models.Login.create({
                username: 'chauffeur'+zone.id_zone,
                password: '1234',
                id_zone: zone.id_zone,
                id_role: '3'
            }).then(function(login){
                resolve(login)
            })
        })
    },

    deleteLogin(body){
        return new Promise(function(resolve, reject){
            models.Login.destroy({
                where:{id_login: body.id_login}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    deleteLoginWithZone(idZone){
        return new Promise(function(resolve, reject){
            models.Login.destroy({
                where:{id_zone: idZone}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateLogin(body){
        return new Promise(function(resolve, reject){
            models.Login.update({
                    username: body.username,
                    password: body.password},
                {where:{id_login: body.idLogin}}
            ).then(function(login){
                resolve(login)
            })
        })
    },

    updateLoginZoneAdminFromModal(loginToChanged, body){
        return new Promise(function(resolve, reject){
            models.Login.update({
                    username: body.zoneUsername,
                    password: body.zonePassword},
                {where:{id_login: loginToChanged.id_login}}
            ).then(function(login){
                resolve(login)
            })
        })
    },

    updateLoginBusDriverFromModal(loginToChanged, body){
        return new Promise(function(resolve, reject){
            models.Login.update({
                    username: body.busdriverUsername,
                    password: body.busdriverPassword},
                {where:{id_login: loginToChanged.id_login}}
            ).then(function(login){
                resolve(login)
            })
        })
    },

    getOneLogin(body){
        return new Promise(function (resolve, reject){
            models.Login.findOne({
                where: {
                    id_login: body.id_login
                }
            }).then(function(login){
                resolve(login)
            })
        })
    },

    findLoginWithZoneNRole(idZone, idRole){
        return new Promise(function (resolve, reject){
            models.Login.findOne({
                where: {
                    id_zone: idZone,
                    id_role: idRole
                }
            }).then(function(login){
                resolve(login)
            })
        })
    },

    getAllLogin(){
        return new Promise(function (resolve, reject){
            models.Login.findAll().then(function(logins){
                resolve(logins)
            })
        })
    },

    findLoginWithUsername(username){
        return new Promise(function (resolve, reject){
            models.Login.findOne({
                where: {
                    username: username
                }
            }).then(function(login){
                resolve(login)
            })
        })
    }
}