const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comanda = sequelize.define('Comanda', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    numero: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM('aberta', 'fechada'), defaultValue: 'aberta', allowNull: false },
}, { tableName: 'comandas' });

module.exports = Comanda;
