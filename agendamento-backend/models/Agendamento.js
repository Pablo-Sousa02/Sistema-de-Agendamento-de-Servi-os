const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    profissional: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    data: { type: Date, required: true },
    observacoes: { type: String }
});

// Criando o modelo Agendamento
const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;
