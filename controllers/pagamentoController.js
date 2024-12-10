const { Pagamento } = require('../models');

// Listar todos os pagamentos
const listarPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        res.status(200).json(pagamentos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar pagamentos.', erro: error.message });
    }
};

// Registrar um novo pagamento
const registrarPagamento = async (req, res) => {
    try {
        const { comanda_id, metodo_pagamento, valor_parcial } = req.body;
        const pagamento = await Pagamento.create({ comanda_id, metodo_pagamento, valor_parcial });
        res.status(201).json(pagamento);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao registrar pagamento.', erro: error.message });
    }
};

module.exports = {
    listarPagamentos,
    registrarPagamento,
};
