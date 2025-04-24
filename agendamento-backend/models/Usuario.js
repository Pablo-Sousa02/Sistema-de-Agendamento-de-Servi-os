const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} não é um email válido!`
    }
  },
  senha: { type: String, required: true },

  fotoPerfil: {
    type: String,
    default: 'default.png', // Nome do arquivo padrão
  }
});

// Criptografando a senha antes de salvar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    console.log("Senha criptografada com sucesso.");
    next();
  } catch (err) {
    console.error("Erro ao criptografar a senha:", err.message);
    next(err);
  }
});

// Método para comparar a senha
UsuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  try {
    const resultado = await bcrypt.compare(senhaDigitada, this.senha);
    return resultado;
  } catch (err) {
    throw err;
  }
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
