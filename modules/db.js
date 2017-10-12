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
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    telephon: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

const Login = sequelize.define('login', {
    id_login: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

const Role = sequelize.define('role', {
    id_role: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    roleName: {
        type: Sequelize.STRING
    }
});

const Zone = sequelize.define('zone', {
    id_zone: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    zoneName: {
        type: Sequelize.STRING
    }
});

const Line = sequelize.define('line', {
    id_line: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    lineName: {
        type: Sequelize.STRING
    },
    fromStation: {
        type: Sequelize.STRING
    },
    toStation: {
        type: Sequelize.STRING
    }
}) ;

const LineStation = sequelize.define('linestation', {
    id_line: {
        type: Sequelize.INTEGER
    },
    id_station: {
        type: Sequelize.INTEGER
    }
});

const Station = sequelize.define('station', {
    id_station: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    stationName: {
        type: Sequelize.STRING
    },
    stopId: {
        type: Sequelize.STRING
    }
});

const Journey = sequelize.define('journey', {
    id_journey: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    journeyNumber: {
        type: Sequelize.STRING
    },
    bus: {
        type: Sequelize.STRING
    }
});

const JourneyReservation = sequelize.define('journeyreservation', {
    id_journey: {
        type: Sequelize.INTEGER
    },
    id_reservation: {
        type: Sequelize.INTEGER
    }
});

const Reservation = sequelize.define('reservation', {
    id_reservation: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    telephon: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    numberBikes: {
        type: Sequelize.INTEGER
    },
    groupName: {
        type: Sequelize.STRING
    },
    from: {
        type: Sequelize.STRING
    },
    to: {
        type: Sequelize.STRING
    },
    remarks: {
        type: Sequelize.STRING
    }
});

const Date = sequelize.define('date', {
    id_date: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    day: {
        type: Sequelize.STRING
    },
    month: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.STRING
    }
});







// LAISSER A LA FIN
// force: true will drop the table if it already exists
sequelize.sync({force: true}).then(() => {
    // Table created
    sequelize.close();
});