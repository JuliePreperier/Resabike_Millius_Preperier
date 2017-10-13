module.exports = (sequelize, DataTypes) => {

    const Date = sequelize.define('date', {
        id_date: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        day: {
            type: Sequelize.STRING,
            allowNull: false
        },
        month: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    Date.associate = (models) => {
        Date.hasMany(models.Reservation, {foreignKey: {name:'id_date', allowNull: false}});
    }



    return Date
};