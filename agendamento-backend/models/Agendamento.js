const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
    clienteId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    profissionalId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    data: { 
        type: Date,  // Alterado para Date em vez de String
        required: true 
    },
    hora: { 
        type: String, 
        required: true 
    },
    servico: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
