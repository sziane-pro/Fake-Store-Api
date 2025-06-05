const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING
    },
    street: {
        type: DataTypes.STRING
    },
    house_number: {
        type: DataTypes.INTEGER
    },
    zipcode: {
        type: DataTypes.STRING
    },
    lat: {
        type: DataTypes.STRING
    },
    long: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: true
});

// Synchroniser le modèle avec la base de données
sequelize.sync()
    .then(() => {
        console.log('Modèle User synchronisé avec la base de données');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation du modèle User:', err);
    });

module.exports = User;