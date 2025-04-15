const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    tipo: { type: String, enum: ['cliente', 'profissional'], required: true }
});

// Método para comparar senhas
UsuarioSchema.methods.compararSenha = function (senhaDigitada) {
return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
