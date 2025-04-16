const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  }
});

// Método para comparar a senha
usuarioSchema.methods.compararSenha = function (senha) {
  return bcrypt.compare(senha, this.senha);
};

// Pre-save para criptografar a senha antes de salvar no banco de dados
usuarioSchema.pre("save", async function (next) {
  if (this.isModified("senha")) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
