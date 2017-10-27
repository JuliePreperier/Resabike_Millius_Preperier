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
        PersonContact.belongsTo(models.Zone, {foreignKey: {name:'id_zone', allowNull: false}, as:'zone'});
    }


    return PersonContact
};



