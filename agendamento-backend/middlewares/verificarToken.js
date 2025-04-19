const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const tokenFormatado = token.replace('Bearer ', '');

    jwt.verify(tokenFormatado, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: "Token inválido" });
        }

        req.usuarioId = decoded.id;
        next();
    });
};

module.exports = verificarToken;
