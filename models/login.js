module.exports = (sequelize, DataTypes) => {

    /* --  LOGIN JOIN TABLE IN DB --*/

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
        Login.belongsTo(models.Zone, {foreignKey: {name: 'id_zone', allowNull: true}, as:'zoneLogin'}); // login has a FK id_zone
        Login.belongsTo(models.Role, {foreignKey: {name:'id_role', allowNull: false}, as:'roleLogin'}); // login has a FK id_role
    }

    return Login
};
