const express = require('express');
const router = express.Router();
const { criarAgendamento, listarMeusAgendamentos, listarAgendamentosDoProfissional } = require('../controllers/agendamentoController');
const verificarToken = require('../middlewares/verificarToken');

router.post('/', verificarToken, criarAgendamento);
router.get('/meus', verificarToken, listarMeusAgendamentos);
router.get('/profissional', verificarToken, listarAgendamentosDoProfissional); // <-- ESSA AQUI!

module.exports = router;
