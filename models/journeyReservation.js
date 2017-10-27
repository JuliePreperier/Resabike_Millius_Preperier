module.exports = (sequelize, DataTypes) => {
    var JourneyReservation = sequelize.define('JourneyReservation', {});

    JourneyReservation.associate = (models) => {
        JourneyReservation.belongsTo(models.Reservation, {foreignKey: {name:'id_reservation', allowNull: false}, as:'reservationJourneyReservation'});
        JourneyReservation.belongsTo(models.Journey, {foreignKey: {name:'id_journey', allowNull: false}, as:'journeyJourneyReservation'});
    }

    return JourneyReservation
};

