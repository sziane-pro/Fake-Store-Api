const { sequelize } = require('./database');
const Product = require('../model/product');
const User = require('../model/user');
const { Cart, CartItem } = require('../model/cart');

const syncDatabase = async () => {
  try {
    // Définir les associations
    User.hasMany(Cart, { foreignKey: 'userId' });
    Cart.belongsTo(User, { foreignKey: 'userId' });
    
    // Synchroniser la base de données
    await sequelize.sync({ alter: true });
    console.log('Les modèles ont été synchronisés avec la base de données.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
};

module.exports = syncDatabase; 