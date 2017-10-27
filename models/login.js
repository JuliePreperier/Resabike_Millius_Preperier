module.exports = (sequelize, DataTypes) => {
    var Login = sequelize.define('Login', {
        id_login: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Login.associate = (models) => {
        Login.belongsTo(models.Zone, {foreignKey: {name: 'id_zone', allowNull: true}, as:'zoneLogin'});
        Login.belongsTo(models.Role, {foreignKey: {name:'id_role', allowNull: false}, as:'roleLogin'});
    }

    return Login
};
