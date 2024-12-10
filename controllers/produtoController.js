const { Produto } = require('../models');



const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao listar produtos:', error.message);
        res.status(500).json({ mensagem: 'Erro ao listar produtos.', erro: error.message });
    }
};


// Criar um novo produto

const criarProduto = async (req, res) => {
    try {
        const { nome, descricao, preco_unitario, estoque_inicial, categoria_id, setor_id } = req.body;

        // Log dos dados recebidos
        console.log('Recebendo dados para criar produto:', req.body);

        // Validação dos dados
        if (!nome || preco_unitario === undefined || estoque_inicial === undefined || !categoria_id) {
            console.error('Erro: Campos obrigatórios não preenchidos.');
            return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos.' });
        }

        // Criação do produto
        const novoProduto = await Produto.create({
            nome,
            descricao,
            preco_unitario,
            estoque_inicial,
            categoria_id,
            setor_id,
        });

        // Log do produto criado
        console.log('Produto criado com sucesso:', novoProduto);

        res.status(201).json(novoProduto);
    } catch (error) {
        // Log detalhado do erro
        console.error('Erro ao criar produto:', error.message);
        res.status(500).json({ mensagem: 'Erro ao criar produto.', erro: error.message });
    }
};

module.exports = {
    listarProdutos,
    criarProduto,
};


// Atualizar um produto existente
const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco_unitario, estoque_inicial, categoria_id, setor_id } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco_unitario = preco_unitario;
        produto.estoque_inicial = estoque_inicial;
        produto.categoria_id = categoria_id;
        produto.setor_id = setor_id;
        await produto.save();
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar produto.', erro: error.message });
    }
};

// Excluir um produto
const excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

        await produto.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir produto.', erro: error.message });
    }
};

module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
};
