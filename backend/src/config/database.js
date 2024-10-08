const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
