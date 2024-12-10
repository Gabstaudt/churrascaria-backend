const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistoricoEstoque = sequelize.define('HistoricoEstoque', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    produto_id: { type: DataTypes.INTEGER, references: { model: 'produtos', key: 'id' } },
    setor_id: { type: DataTypes.INTEGER, references: { model: 'setores', key: 'id' } },
    usuario_id: { type: DataTypes.INTEGER, references: { model: 'usuarios', key: 'id' } },
    tipo_movimentacao: { type: DataTypes.ENUM('entrada', 'saida'), allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    data_hora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'historico_estoque' });

module.exports = HistoricoEstoque;
