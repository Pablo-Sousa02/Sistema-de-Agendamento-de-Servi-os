// routes/agendamentoRoutes.js
const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const verificarToken = require('../middlewares/verificarToken'); // Caso haja verificação de token

// Definindo as rotas
router.post('/', verificarToken, agendamentoController.criarAgendamento);
router.get('/meus', verificarToken, agendamentoController.listarMeusAgendamentos);
router.get('/profissional', verificarToken, agendamentoController.listarAgendamentosDoProfissional);

// Exportando as rotas
module.exports = router;
