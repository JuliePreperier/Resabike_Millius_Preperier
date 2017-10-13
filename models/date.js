module.exports = (sequelize, DataTypes) => {

    var Date = sequelize.define('Date', {
        id_date: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Date.associate = (models) => {
        Date.hasMany(models.Reservation, {foreignKey: {name:'id_date', allowNull: false}});
    }

    return Date
};