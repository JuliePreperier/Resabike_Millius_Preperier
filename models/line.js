module.exports = (sequelize, DataTypes) => {
    var Line = sequelize.define('line', {
        id_line: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        lineName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fromStation: {
            type: Sequelize.STRING,
            allowNull: false
        },
        toStation: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    Line.associate = (models) => {
        Line.belongsTo(models.Zone);
        Line.hasMany(models.Journey, {foreignKey: {name: 'id_line', allowNull: false}});
        Line.hasMany(models.LineStation, {foreignKey: {name:'id_line', allowNull: false}});
    }



    return Line
};

module.exports = (sequelize, DataTypes) => {
    var LineStation = sequelize.define('linestation', {});
    LineStation.associate = (models) => {
        LineStation.belongsTo(models.Line);
        LineStation.belongsTo(models.Station);
    }

    return LineStation
};