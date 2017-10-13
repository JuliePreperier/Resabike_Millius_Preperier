module.exports = (sequelize, DataTypes) => {
    var Reservation = sequelize.define('reservation', {
        id_reservation: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telephon: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numberBikes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        groupName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        from: {
            type: Sequelize.STRING,
            allowNull: false
        },
        to: {
            type: Sequelize.STRING,
            allowNull: false
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isConfirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    Reservation.associate = (models) => {
        Reservation.belongsTo(models.Date);
        Reservation.hasMany(models.JourneyReservation, {foreignKey: {name:'id_reservation', allowNull: false}});
    }



    return Reservation
};