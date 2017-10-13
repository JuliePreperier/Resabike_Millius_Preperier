module.exports = (sequelize, DataTypes) => {
    var JourneyReservation = sequelize.define('JourneyReservation', {});

    JourneyReservation.associate = (models) => {
        JourneyReservation.belongsTo(models.Reservation, {foreignKey: {name:'id_reservation', allowNull: false}});
        JourneyReservation.belongsTo(models.Journey, {foreignKey: {name:'id_journey', allowNull: false}});
    }

    return JourneyReservation
};