const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_database_user', 'your_database_password', {
    host: 'your_database_host',
    dialect: 'postgres'
});

module.exports = sequelize;
