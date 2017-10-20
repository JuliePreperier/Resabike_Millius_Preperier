var models = require('../models');

module.exports= {
    /* -- ZONE --*/
    insertZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                zoneName: body.zoneName
            }).then(function(zone){
                resolve(zone)
            })
        })
    },

    deleteZone(body){
        return new Promise(function(resolve, reject){
            models.Zone.destroy({
                where:{id_zone: body.id_zone}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateZone(body){
        return new Promise(function(resolve, reject){
            models.Zone.update({
                    zoneName: body.zoneName,
                    id_personContact: body.personcontact.id_personContact},
                {where:{id_zone: body.id_zone}}
            ).then(function(zone){
                resolve(zone)
            })
        })
    }
}