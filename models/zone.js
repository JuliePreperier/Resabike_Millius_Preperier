module.exports = (sequelize, DataTypes) => {
    var Zone = sequelize.define('Zone', {
        id_zone: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        zoneName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Zone.associate = (models) => {
        Zone.hasOne(models.PersonContact, {foreignKey: {name:'id_zone', allowNull: false}, as:'zone'});
        Zone.hasMany(models.Login, {foreignKey: {name: 'id_zone', allowNull: false}});
        Zone.hasMany(models.Line, {foreignKey: {name:'id_zone', allowNull: false}});
    }

    return Zone
};