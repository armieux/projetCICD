const express = require('express');
const app = express();
const PORT = process.env.PORT || 4949;
const db = require('./config/database'); // Import the database connection

// Import des controllers
const groupController = require('./controllers/groupController');
const userController = require('./controllers/userController');

// Middleware pour parser le JSON
app.use(express.json());

// Routes pour les groupes
app.get('/api/groups', groupController.getGroups);
app.post('/api/groups', groupController.createGroup);
app.post('/api/groups/:groupId/users', groupController.addUserToGroup);
app.delete('/api/groups/:groupId/users/:userId', groupController.removeUserFromGroup);

// Routes pour les utilisateurs
app.get('/api/users', userController.getUsers);
app.post('/api/users', userController.createUser);
// Route par défault pour voir si le serveur marche
app.get('/', (req, res) => {
    res.send('Le serveur fonctionne correctement !');
});

// Démarrer le serveur
(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database, forcing table creation
        await db.sync({ force: false });
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
