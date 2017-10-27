module.exports = (sequelize, DataTypes) => {
    var LineStation = sequelize.define('LineStation', {});
    LineStation.associate = (models) => {
        LineStation.belongsTo(models.Line, {foreignKey: {name:'id_line', allowNull: false}, as:'lineLinestation'});
        LineStation.belongsTo(models.Station, {foreignKey: {name:'id_station', allowNull: false}, as:'stationLineStation'});
    }

    return LineStation
};