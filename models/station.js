module.exports = (sequelize, DataTypes) => {
    var Station = sequelize.define('station', {
        id_station: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        stationName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stopId: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    Station.associate = (models) => {
        Station.hasMany(models.LineStation, {foreignKey: {name:'id_station', allowNull: false}});
    }



    return Station
}