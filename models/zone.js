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
        Zone.hasOne(models.PersonContact, {foreignKey: {name:'id_zone', allowNull: false}, as:'zonePersonContact'});
        Zone.hasMany(models.Login, {foreignKey: {name: 'id_zone', allowNull: false}, as:'zoneLogin'});
        Zone.hasMany(models.Line, {foreignKey: {name:'id_zone', allowNull: false}, as:'zoneLine'});
    }

    return Zone
};