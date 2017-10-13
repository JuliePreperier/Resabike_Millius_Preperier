module.exports = (sequelize, DataTypes) => {
    var Zone = sequelize.define('zone', {
        id_zone: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        zoneName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Zone.associate = (models) => {
        Zone.belongsTo(models.PersonContact);
        Zone.hasMany(models.Login, {foreignKey: {name: 'id_zone', allowNull: false}});
        Zone.hasMany(models.Line, {foreignKey: {name:'id_zone', allowNull: false}});
    }

    return Zone
};