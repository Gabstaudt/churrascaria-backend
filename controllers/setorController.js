const { Setor } = require('../models');


const listarSetores = async (req, res) => {
    try {
        const setores = await Setor.findAll();
        res.status(200).json(setores);
    } catch (error) {
        console.error('Erro ao listar setores:', error.message);
        res.status(500).json({ mensagem: 'Erro ao listar setores.', erro: error.message });
    }
};

const criarSetor = async (req, res) => {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ mensagem: 'O nome do setor é obrigatório.' });
        }

        const novoSetor = await Setor.create({ nome });
        res.status(201).json(novoSetor);
    } catch (error) {
        console.error('Erro ao criar setor:', error.message);
        res.status(500).json({ mensagem: 'Erro ao criar setor.', erro: error.message });
    }
};

module.exports = { listarSetores, criarSetor };


// Atualizar um setor existente
const atualizarSetor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const setor = await Setor.findByPk(id);
        if (!setor) return res.status(404).json({ mensagem: 'Setor não encontrado.' });

        setor.nome = nome;
        await setor.save();
        res.status(200).json(setor);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar setor.', erro: error.message });
    }
};

// Excluir um setor
const excluirSetor = async (req, res) => {
    try {
        const { id } = req.params;
        const setor = await Setor.findByPk(id);
        if (!setor) return res.status(404).json({ mensagem: 'Setor não encontrado.' });

        await setor.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir setor.', erro: error.message });
    }
};

module.exports = {
    listarSetores,
    criarSetor,
    atualizarSetor,
    excluirSetor,
};
