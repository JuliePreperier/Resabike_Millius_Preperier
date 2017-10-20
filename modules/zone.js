var models = require('../models');

module.exports= {
    /* -- ZONE --*/
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

    deleteZone(body){
        return new Promise(function(resolve, reject){
            models.Zone.destroy({
                where:{id: body.id}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    updateZone(body){
        return new Promise(function(resolve, reject){
            models.Zone.update({
                    zoneName: body.zoneName,
                    id_personContact: body.personcontact.id},
                {where:{id: body.id}}
            )
        })
    }
}