const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdatabase', 'myuser', 'mypassword', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
