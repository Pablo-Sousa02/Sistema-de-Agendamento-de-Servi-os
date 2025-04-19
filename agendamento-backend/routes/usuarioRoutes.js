const express = require('express');
const router = express.Router();
const { login, cadastrar, listarUsuarios, buscarProfissionais, excluirPerfil, editarPerfil, verificarUsuario } = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/verificarToken');

// Rotas públicas
router.post('/cadastrar', cadastrar);
router.post('/login', login);

// Rotas protegidas
router.get('/usuarios', verificarToken, listarUsuarios);
router.get('/profissionais', verificarToken, buscarProfissionais);
router.delete('/usuarios/:id', verificarToken, excluirPerfil);
router.put('/usuarios/:id', verificarToken, editarPerfil);
router.get('/usuarios/me', verificarToken, verificarUsuario);

module.exports = router;
