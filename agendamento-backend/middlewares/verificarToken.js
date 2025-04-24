const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Espera "Bearer <token>"

    if (!token) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensagem: "Token inválido" });
        }

        req.user = { id: decoded.id, tipo: decoded.tipo }; // Salva como req.user (padrão mais comum)
        next();
    });
};

module.exports = verificarToken;
