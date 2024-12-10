const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    estoque_inicial: { type: DataTypes.INTEGER, allowNull: false },
    categoria_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'categorias', key: 'id' } },
    setor_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'setores', key: 'id' } },
}, {
    tableName: 'produtos',
    timestamps: false,
});

module.exports = Produto;
