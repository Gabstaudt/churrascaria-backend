const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        // Busca o usuário pelo e-mail
        const usuario = await Usuario.findOne({ where: { email } });

        // Verifica se o usuário existe
        if (!usuario) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });
        }

        // Compara a senha fornecida com a senha armazenada
        if (usuario.senha_hash !== senha) {
            return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error.message);
        res.status(500).json({ mensagem: 'Erro ao autenticar usuário.', erro: error.message });
    }
};

module.exports = { login };
