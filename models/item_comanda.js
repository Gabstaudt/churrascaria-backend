const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemComanda = sequelize.define('ItemComanda', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    comanda_id: { type: DataTypes.INTEGER, references: { model: 'comandas', key: 'id' } },
    produto_id: { type: DataTypes.INTEGER, references: { model: 'produtos', key: 'id' } },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'itens_comanda' });

module.exports = ItemComanda;
