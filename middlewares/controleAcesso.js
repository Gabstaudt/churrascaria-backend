const verificarPermissao = (tipoPermitido) => {
    return (req, res, next) => {
        if (req.usuario.tipo !== tipoPermitido) {
            return res.status(403).json({ mensagem: 'Acesso negado.' });
        }
        next();
    };
};

module.exports = { verificarPermissao };
