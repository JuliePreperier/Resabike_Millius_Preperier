module.exports = (sequelize, DataTypes) => {
    var Line = sequelize.define('Line', {
        id_line: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lineName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fromStation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        toStation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Line.associate = (models) => {
        Line.belongsTo(models.Zone, {foreignKey: {name:'id_zone', allowNull: false}});
        Line.hasMany(models.Journey, {foreignKey: {name: 'id_line', allowNull: false}});
        Line.hasMany(models.LineStation, {foreignKey: {name:'id_line', allowNull: false}});
    }



    return Line
};

