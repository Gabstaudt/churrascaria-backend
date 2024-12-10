const { HistoricoEstoque, Produto, Setor, Usuario } = require('../models');

// Listar o histórico de estoque
const listarHistorico = async (req, res) => {
    try {
        const historico = await HistoricoEstoque.findAll({
            include: [Produto, Setor, Usuario],
        });
        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar histórico de estoque.', erro: error.message });
    }
};

// Registrar uma movimentação de estoque
const registrarMovimentacao = async (req, res) => {
    try {
        const { produto_id, setor_id, usuario_id, tipo_movimentacao, quantidade } = req.body;
        const movimentacao = await HistoricoEstoque.create({
            produto_id,
            setor_id,
            usuario_id,
            tipo_movimentacao,
            quantidade,
        });
        res.status(201).json(movimentacao);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao registrar movimentação.', erro: error.message });
    }
};

module.exports = {
    listarHistorico,
    registrarMovimentacao,
};
