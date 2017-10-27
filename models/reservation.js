module.exports = (sequelize, DataTypes) => {
    var Reservation = sequelize.define('Reservation', {
        id_reservation: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberBikes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isConfirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    Reservation.associate = (models) => {
        Reservation.belongsTo(models.Date, {foreignKey: {name:'id_date', allowNull: false}, as:'date'});
        Reservation.hasMany(models.JourneyReservation, {foreignKey: {name:'id_reservation', allowNull: false}});
    }



    return Reservation
};