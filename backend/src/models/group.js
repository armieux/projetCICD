const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous d'avoir configuré la connexion à la base de données
const User = require('./user'); // Importez le modèle User pour l'association

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
    // Ajoutez d'autres champs selon vos besoins
});

// Définissez l'association many-to-many entre Group et User
Group.belongsToMany(User, { through: 'UserGroup' });
User.belongsToMany(Group, { through: 'UserGroup' });

module.exports = Group;
