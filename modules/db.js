const Sequelize = require("sequelize");

const sequelize = new Sequelize('resabikedb', 'resa', '1234', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});










// LAISSER A LA FIN
// force: true will drop the table if it already exists
sequelize.sync({force: true}).then(() => {
    // Table created
    sequelize.close();
});