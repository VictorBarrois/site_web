const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion ou création de la base SQLite
const db = new sqlite3.Database(path.join(__dirname, "../db/contacts.db"), (err) => {
    if (err) console.error("Erreur SQLite :", err.message);
    else console.log("Connecté à la base contacts.db");
});

// Création de la table si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    email TEXT,
    message TEXT,
    date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Import des routes et passage de la DB
const contactRoutes = require("../routes/maroute");
app.use("/contact", contactRoutes(db));

// Lancer le serveur
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
