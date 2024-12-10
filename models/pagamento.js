const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    comanda_id: { type: DataTypes.INTEGER, references: { model: 'comandas', key: 'id' } },
    metodo_pagamento: { type: DataTypes.ENUM('dinheiro', 'cartao', 'pix'), allowNull: false },
    valor_parcial: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    data_hora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'pagamentos' });

module.exports = Pagamento;
