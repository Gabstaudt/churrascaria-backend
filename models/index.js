const sequelize = require('../config/database');
const Setor = require('./setor');
const Categoria = require('./categoria');
const Produto = require('./produto');
const Usuario = require('./usuario');
const Comanda = require('./comanda');
const ItemComanda = require('./item_comanda');
const Pagamento = require('./pagamento');
const HistoricoEstoque = require('./historico_estoque');

// Relacionamentos
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Produto.belongsTo(Setor, { foreignKey: 'setor_id' });
Usuario.belongsTo(Setor, { foreignKey: 'setor_id' });
HistoricoEstoque.belongsTo(Produto, { foreignKey: 'produto_id' });
HistoricoEstoque.belongsTo(Setor, { foreignKey: 'setor_id' });
HistoricoEstoque.belongsTo(Usuario, { foreignKey: 'usuario_id' });
ItemComanda.belongsTo(Produto, { foreignKey: 'produto_id' });
ItemComanda.belongsTo(Comanda, { foreignKey: 'comanda_id' });
Pagamento.belongsTo(Comanda, { foreignKey: 'comanda_id' });

module.exports = {
    sequelize,
    Setor,
    Categoria,
    Produto,
    Usuario,
    Comanda,
    ItemComanda,
    Pagamento,
    HistoricoEstoque,
};
