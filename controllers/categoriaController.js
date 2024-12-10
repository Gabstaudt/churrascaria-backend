const { Categoria } = require('../models');

// Listar todas as categorias
const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Erro ao listar categorias:', error.message);
        res.status(500).json({ mensagem: 'Erro ao listar categorias.', erro: error.message });
    }
};

// Função para criar categorias
const criarCategoria = async (req, res) => {
    try {
        const { nome } = req.body;

        // Validação do nome da categoria
        if (!nome) {
            return res.status(400).json({ mensagem: 'O nome da categoria é obrigatório.' });
        }

        // Cria a categoria no banco de dados
        const novaCategoria = await Categoria.create({ nome });

        res.status(201).json(novaCategoria); // Retorna a categoria criada
    } catch (error) {
        console.error('Erro ao criar categoria:', error.message);
        res.status(500).json({ mensagem: 'Erro ao criar categoria.', erro: error.message });
    }
};

// Exporte todas as funções após defini-las
module.exports = {
    listarCategorias,
    criarCategoria,
};

// Atualizar uma categoria existente
const atualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada.' });

        categoria.nome = nome;
        categoria.descricao = descricao;
        await categoria.save();
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar categoria.', erro: error.message });
    }
};

// Excluir uma categoria
const excluirCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada.' });

        await categoria.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir categoria.', erro: error.message });
    }
};

module.exports = {
    listarCategorias,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria,
};
