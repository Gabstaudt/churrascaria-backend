const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    senha_hash: { type: DataTypes.STRING, allowNull: false },
    tipo: { type: DataTypes.ENUM('administrador', 'caixa', 'funcionario'), allowNull: false },
    setor_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'setores', key: 'id' } },
}, { 
    tableName: 'usuarios',
    timestamps: false 
});

module.exports = Usuario;
