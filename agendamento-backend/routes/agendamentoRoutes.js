const express= require('express');


const router= express.Router();
const Agendamento= require('../models/Agendamento');
router.post('/', async (req, res) => {
    try{
        const novoAgendamento= new Agendamento(req.body);
        await novoAgendamento.save();
        res.status(201).json(novoAgendamento);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Erro ao criar agendamento'});
    }   
}
);
router.get('/', async (req, res) => {
    try {
        const agendamentos = await Agendamento.find();
        res.json(agendamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar agendamentos' });
    }
});


module.exports= router;