const { Comanda, ItemComanda, Produto } = require('../models');

// Listar todas as comandas
const listarComandas = async (req, res) => {
    try {
        const comandas = await Comanda.findAll({
            include: [{ model: ItemComanda, include: Produto }],
        });
        res.status(200).json(comandas);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar comandas.', erro: error.message });
    }
};

// Criar uma nova comanda
const criarComanda = async (req, res) => {
    try {
        const { numero } = req.body;
        const novaComanda = await Comanda.create({ numero });
        res.status(201).json(novaComanda);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar comanda.', erro: error.message });
    }
};

// Atualizar o status de uma comanda (fechar)
const fecharComanda = async (req, res) => {
    try {
        const { id } = req.params;
        const comanda = await Comanda.findByPk(id);
        if (!comanda) return res.status(404).json({ mensagem: 'Comanda não encontrada.' });

        comanda.status = 'fechada';
        await comanda.save();
        res.status(200).json(comanda);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fechar comanda.', erro: error.message });
    }
};

// Excluir uma comanda
const excluirComanda = async (req, res) => {
    try {
        const { id } = req.params;
        const comanda = await Comanda.findByPk(id);
        if (!comanda) return res.status(404).json({ mensagem: 'Comanda não encontrada.' });

        await comanda.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir comanda.', erro: error.message });
    }
};

module.exports = {
    listarComandas,
    criarComanda,
    fecharComanda,
    excluirComanda,
};
