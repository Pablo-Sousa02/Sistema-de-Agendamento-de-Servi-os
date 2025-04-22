    // models/Agendamento.js
    const mongoose = require('mongoose');

    const AgendamentoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    profissional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    servico: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    }, {
    timestamps: true
    });

    module.exports = mongoose.model('Agendamentos', AgendamentoSchema);
