const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/verificarToken');
const Usuario = require('../models/Usuario');

router.get('/debug', verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuarioId);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        res.json({
            usuarioId: req.usuarioId,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        });
    } catch (error) {
        console.error('Erro no debug:', error);
        res.status(500).json({ mensagem: 'Erro no debug.' });
    }
});

module.exports = router;
