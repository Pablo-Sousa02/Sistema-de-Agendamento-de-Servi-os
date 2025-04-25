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
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validação de email
      },
      message: props => `${props.value} não é um email válido!`
    }
  },
  senha: { type: String, required: true },
});

// Antes de salvar o usuário, criptografar a senha
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next(); // Não criptografa se a senha não foi modificada
  }
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

// Método para comparar senha
UsuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  try {
    console.log("Senha armazenada: ", this.senha);  // Imprime a senha criptografada no banco
    console.log("Senha recebida para comparar: ", senhaDigitada); // Imprime a senha digitada

    const resultado = await bcrypt.compare(senhaDigitada, this.senha);
    console.log("Resultado da comparação:", resultado); // Imprime o resultado da comparação

    return resultado;
  } catch (err) {
    console.error("Erro ao comparar a senha:", err.message);
    throw err;
  }
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
