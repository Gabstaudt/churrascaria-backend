const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensagem: 'Acesso não autorizado.' });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario; // Adiciona o usuário ao objeto `req` para rotas subsequentes
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido.' });
    }
};

module.exports = { autenticarUsuario };
