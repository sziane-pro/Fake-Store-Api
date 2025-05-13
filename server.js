//initializes
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

// Importer la configuration de la base de données
const { testConnection } = require('./config/database');
const syncDatabase = require('./config/sync-db');

//app
const app = express();

//port
const port = process.env.PORT || 6400;

//routes
const productRoute = require('./routes/product');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.disable('view cache');

app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

// Connecter à la base de données et démarrer le serveur
const startServer = async () => {
	try {
		// Tester la connexion
		await testConnection();
		
		// Synchroniser les modèles avec la base de données
		await syncDatabase();
		
		// Démarrer le serveur
		app.listen(port, () => {
			console.log(`Serveur démarré sur le port ${port}`);
		});
	} catch (err) {
		console.error('Erreur lors du démarrage du serveur:', err);
	}
};

startServer();

module.exports = app;
