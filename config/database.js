const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données MySQL établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données MySQL:', error);
  }
};

module.exports = { sequelize, testConnection }; 