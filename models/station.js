module.exports = (sequelize, DataTypes) => {
    var Station = sequelize.define('Station', {
        id_station: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        stationName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stopId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Station.associate = (models) => {
        Station.hasMany(models.LineStation, {foreignKey: {name:'id_station', allowNull: false}});
    }



    return Station
}