module.exports = (sequelize, DataTypes) => {
    var Journey = sequelize.define('journey', {
        id_journey: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        journeyNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bus: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    Journey.associate = (models) => {
        Journey.hasMany(models.JourneyReservation, {foreignKey: {name:'id_journey', allowNull: false}});
        Journey.belongsTo(models.Line);
    }


    return Journey
};

module.exports = (sequelize, DataTypes) => {
    var JourneyReservation = sequelize.define('journeyreservation', {});

    JourneyReservation.associate = (models) => {
        JourneyReservation.belongsTo(models.Reservation);
        JourneyReservation.belongsTo(models.Journey);
    }

    return JourneyReservation
};
