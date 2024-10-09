require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
    DB_NAME = 'mydatabase', // Default value
    DB_USER = 'myuser',     // Default value
    DB_PASSWORD = 'mypassword', // Default value
    DB_HOST = 'db',         // Default value, can be overridden by Docker
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
});

module.exports = sequelize;
