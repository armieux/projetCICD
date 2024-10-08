const express = require('express');
const app = express();
const PORT = process.env.PORT || 4949;

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



// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
