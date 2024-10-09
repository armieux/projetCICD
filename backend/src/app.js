const express = require('express');
const app = express();

// Import controllers
const groupController = require('./controllers/groupController');
const userController = require('./controllers/userController');

// Middleware to parse JSON
app.use(express.json());

// Routes for groups
app.get('/api/groups', groupController.getGroups);
app.post('/api/groups', groupController.createGroup);
app.post('/api/groups/:groupId/users', groupController.addUserToGroup);
app.delete('/api/groups/:groupId/users/:userId', groupController.removeUserFromGroup);

// Routes for users
app.get('/api/users', userController.getUsers);
app.post('/api/users', userController.createUser);

// Default route to check if the server is working
app.get('/', (req, res) => {
    res.send('Le serveur fonctionne correctement !');
});

module.exports = app; // Export the app for use in server.js
