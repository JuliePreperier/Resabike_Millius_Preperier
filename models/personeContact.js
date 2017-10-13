module.exports = (sequelize, DataTypes) =>{
    var PersonContact = sequelize.define('PersonContact', {
        id_personContact: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    PersonContact.associate = (models) => {
        PersonContact.hasOne(models.Zone, {foreignKey: {name:'id_personContact', allowNull: false}});
    }


    return PersonContact
};



