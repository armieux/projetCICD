const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdatabase', 'myuser', 'mypassword', {
    host: 'db',
    dialect: 'postgres'
});

module.exports = sequelize;
