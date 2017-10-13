module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('Role', {
        id_role: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Role.associate = (models) => {
        Role.hasMany(models.Login, {foreignKey: {name:'id_role', allowNull: false}});
    }


    return Role;
};