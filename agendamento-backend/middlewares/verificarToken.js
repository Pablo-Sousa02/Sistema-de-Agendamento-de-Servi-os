const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Primeiro, tentar pegar o token da header Authorization
    const token = req.headers['authorization']?.split(' ')[1];  // Pega apenas a parte do token após "Bearer"

    if (!token) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: "Token inválido" });
        }

        req.usuarioId = decoded.id;  // Salva o id do usuário no request para uso posterior
        next();
    });
};

module.exports = verificarToken;
