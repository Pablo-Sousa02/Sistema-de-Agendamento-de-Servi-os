    const express = require('express');
    const router = express.Router();
    const Usuario = require('../models/Usuario');
    const verificarToken = require('../middlewares/verificarToken'); // Middleware de autenticação
    const upload = require('../middlewares/Uploads');

    // Importa os controladores
    const {
    login,
    cadastrar,
    listarUsuarios,
    buscarProfissionais,
    excluirPerfil,
    editarPerfil,
    verificarUsuario
    } = require('../controllers/usuarioController');

    // Rotas públicas
    router.post('/cadastrar', cadastrar);
    router.post('/login', login);

    // Rotas protegidas
    router.get('/usuarios', verificarToken, listarUsuarios);
    router.get('/profissionais', verificarToken, buscarProfissionais); // 🛠 Adicionei verificarToken por segurança
    router.delete('/usuarios/:id', verificarToken, excluirPerfil);
    router.put('/usuarios/:id', verificarToken, editarPerfil);
    router.get('/usuarios/me', verificarToken, verificarUsuario);

    // Rota para atualizar perfil com upload de imagem
    router.put('/perfil', verificarToken, upload.single('fotoPerfil'), async (req, res) => {
    try {
        const userId = req.user.id; // Corrigido para pegar o id do token via req.user
        const { nome, email } = req.body;
        const fotoPerfil = req.file ? req.file.filename : undefined;

        const atualizacao = {};
        if (nome) atualizacao.nome = nome;
        if (email) atualizacao.email = email;
        if (fotoPerfil) atualizacao.fotoPerfil = fotoPerfil;

        const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        userId,
        atualizacao,
        { new: true }
        );

        res.json({
        mensagem: 'Perfil atualizado com sucesso!',
        usuario: usuarioAtualizado
        });
    } catch (err) {
        console.error('Erro ao atualizar perfil:', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar perfil.' });
    }
    });

    module.exports = router;
