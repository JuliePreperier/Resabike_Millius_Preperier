module.exports = (sequelize, DataTypes) => {
    var Login = sequelize.define('login', {
        id_login: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Login.associate = (models) => {
        Login.belongsTo(models.Zone);
        Login.belongsTo(models.Role);
    }

    return Login
};
