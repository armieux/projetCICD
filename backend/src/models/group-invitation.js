const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Connexion à la base de données

const GroupInvitation = sequelize.define('GroupInvitation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    inviteId: {
        type: DataTypes.UUID, // Générer un identifiant unique pour chaque invitation
        defaultValue: DataTypes.UUIDV4, // UUID généré automatiquement
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'active'), // Statut du groupe
        defaultValue: 'pending',
        allowNull: false
    }
});

module.exports = GroupInvitation;