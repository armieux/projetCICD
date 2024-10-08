const express = require('express');
const app = express();
const PORT = process.env.PORT || 4949;

// Middleware pour parser le JSON
app.use(express.json());

// Routes pour les groupes
app.get('/api/groups', (req, res) => {
    // Logique pour récupérer la liste des groupes
    res.send('GET /api/groups'); 
});

app.post('/api/groups', (req, res) => {
    // Logique pour créer un nouveau groupe
    res.send('POST /api/groups');
});

app.post('/api/groups/:groupId/users', (req, res) => {
    // Logique pour ajouter un utilisateur à un groupe
    res.send('POST /api/groups/:groupId/users');
});

app.delete('/api/groups/:groupId/users/:userId', (req, res) => {
    // Logique pour retirer un utilisateur d'un groupe
    res.send('DELETE /api/groups/:groupId/users/:userId');
});

// Routes pour les utilisateurs
app.get('/api/users', (req, res) => {
    // Logique pour récupérer la liste des utilisateurs
    res.send('GET /api/users');
});

app.post('/api/users', (req, res) => {
    // Logique pour créer un nouvel utilisateur
    res.send('POST /api/users');
});


// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
