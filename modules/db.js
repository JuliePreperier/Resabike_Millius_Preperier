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

const PersonContact = sequelize.define('personcontact', {
    id_personContact: {
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
    }
});

const Login = sequelize.define('login', {
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

const Role = sequelize.define('role', {
    id_role: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    roleName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Zone = sequelize.define('zone', {
    id_zone: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    zoneName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Line = sequelize.define('line', {
    id_line: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    lineName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fromStation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    toStation: {
        type: Sequelize.STRING,
        allowNull: false
    }
}) ;


const Station = sequelize.define('station', {
    id_station: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    stationName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stopId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Journey = sequelize.define('journey', {
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

const Reservation = sequelize.define('reservation', {
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

const Date = sequelize.define('date', {
    id_date: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false
    },
    month: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

PersonContact.hasOne(Zone, {foreignKey: {name:'id_personContact', allowNull: false}});
Zone.hasMany(Login, {foreignKey: {name: 'id_zone', allowNull: false}});
Role.hasMany(Login, {foreignKey: {name:'id_role', allowNull: false}});
Zone.hasMany(Line, {foreignKey: {name:'id_zone', allowNull: false}});
Line.hasMany(Journey, {foreignKey: {name: 'id_line', allowNull: false}});
Date.hasMany(Reservation, {foreignKey: {name:'id_date', allowNull: false}});

Line.belongsToMany(Station,{ through: 'lineStation', foreignKey: {name:'idStation', AllowNull:false}});
Station.belongsToMany(Line,{ through: 'lineStation', foreignKey: {name:'idLine', AllowNull:false}});

Journey.belongsToMany(Reservation,{ through: 'JourneyReservation', foreignKey: {name:'idReservation', AllowNull:false}});
Reservation.belongsToMany(Journey,{ through: 'JourneyReservation', foreignKey: {name:'idJourney', AllowNull:false}});

// LAISSER A LA FIN
// force: true will drop the table if it already exists
sequelize.sync({force: true}).then(() => {
    // Table created
    sequelize.close();
});