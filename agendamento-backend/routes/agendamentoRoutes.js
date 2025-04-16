const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento'); // Certifique-se de que o caminho esteja correto

// Rota para criar um agendamento
router.post('/', (req, res) => {
    const { cliente, profissional, data, observacoes } = req.body;

    const novoAgendamento = new Agendamento({
        cliente,
        profissional,
        data,
        observacoes
    });

    // Salvando o agendamento no banco de dados
    novoAgendamento.save()
        .then(agendamento => {
            res.status(201).json(agendamento);
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
});

// Exportando as rotas para o arquivo principal
module.exports = router;
