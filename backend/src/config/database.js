const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
    host: 'db',
    dialect: 'postgres'
});

module.exports = sequelize;
