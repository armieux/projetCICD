const app = require('./app'); // Import the app from app.js
const db = require('./config/database'); // Import the database connection
const PORT = process.env.PORT || 4949;

// Start the server and connect to the database
(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database
        await db.sync({ force: false });
        console.log('Database synchronized.');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
