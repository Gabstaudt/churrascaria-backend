const { ItemComanda, Produto } = require('../models');

// Listar todos os itens de uma comanda
const listarItensComanda = async (req, res) => {
    try {
        const { comanda_id } = req.params;
        const itens = await ItemComanda.findAll({
            where: { comanda_id },
            include: Produto,
        });
        res.status(200).json(itens);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar itens da comanda.', erro: error.message });
    }
};

// Adicionar item à comanda
const adicionarItem = async (req, res) => {
    try {
        const { comanda_id, produto_id, quantidade, preco_unitario } = req.body;
        const item = await ItemComanda.create({ comanda_id, produto_id, quantidade, preco_unitario });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao adicionar item à comanda.', erro: error.message });
    }
};

// Remover item da comanda
const removerItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ItemComanda.findByPk(id);
        if (!item) return res.status(404).json({ mensagem: 'Item não encontrado.' });

        await item.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao remover item da comanda.', erro: error.message });
    }
};

module.exports = {
    listarItensComanda,
    adicionarItem,
    removerItem,
};
