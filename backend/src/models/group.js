const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous d'avoir configuré la connexion à la base de données

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Group;
