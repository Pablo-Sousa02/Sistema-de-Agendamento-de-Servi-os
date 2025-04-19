const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const usuarioController = require('../controllers/usuarioController'); // <- Corrigido aqui

// Rota para cadastrar agendamento
router.post('/cadastrar', agendamentoController.cadastrarAgendamento);

// Rota para buscar todos os agendamentos
router.get('/', agendamentoController.buscarAgendamentos);

// Rota para excluir agendamento
router.delete('/:id', agendamentoController.excluirAgendamento);

// Rota para buscar agendamentos por profissional
router.get('/profissionais', usuarioController.buscarProfissionais);

module.exports = router;
