module.exports = (sequelize, DataTypes) => {
    var Journey = sequelize.define('Journey', {
        id_journey: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        journeyNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horaire: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Journey.associate = (models) => {
        Journey.hasMany(models.JourneyReservation, {foreignKey: {name:'id_journey', allowNull: false}, as:'journeyJourneyReservation'});
        Journey.belongsTo(models.Line, {foreignKey: {name: 'id_line', allowNull: false}, as:'journeyLine'});
    }


    return Journey
};
