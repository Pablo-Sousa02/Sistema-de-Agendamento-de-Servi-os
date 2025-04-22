require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");

const app = express();
app.use(express.json());
// Middlewares
app.use(cors({
  origin: 'http://localhost:3000' // Altere para o endereço do seu frontend
}));

// Rotas
const usuarioRoutes = require("./routes/usuarioRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes"); // Adicione esta linha
app.use("/api/usuarios", usuarioRoutes);
app.use('/api/agendamentos', agendamentoRoutes); // Certifique-se de que as rotas de agendamento estão sendo usadas corretamente

// Conexão com o banco de dados e inicialização do servidor
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(chalk.green.bold("✅ Conectado ao MongoDB"));
    app.listen(PORT, () => {
      console.log(chalk.blueBright.bold(`🚀 Servidor rodando na porta ${PORT}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red.bold("❌ Erro de conexão com o MongoDB:"), err);
  });
