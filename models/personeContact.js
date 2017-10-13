module.exports = (sequelize, DataTypes) =>{
    var PersonContact = sequelize.define('personcontact', {
        id_personContact: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telephon: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    PersonContact.associate = (models) => {
        PersonContact.hasOne(models.Zone, {foreignKey: {name:'id_personContact', allowNull: false}});
    }


    return PersonContact
};



