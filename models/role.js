module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('role', {
        id_role: {
            type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
        },
        roleName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Role.associate = (models) => {
        Role.hasMany(models.Login, {foreignKey: {name:'id_role', allowNull: false}});
    }


    return Role;
};