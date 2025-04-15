const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    profissional: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    data: { type: Date, required: true },
    observaoes: { type: String }
});
