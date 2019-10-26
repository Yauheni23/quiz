const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: false,
    port: 5432,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": {"require": true}
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/user.model')(sequelize, Sequelize);

module.exports = db;
