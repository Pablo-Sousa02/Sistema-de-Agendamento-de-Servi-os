require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const path = require('path');


// Rotas
const usuarioRoutes = require("./routes/usuarioRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const debugRoute = require("./routes/debugRoute");

const app = express();

// Middleware JSON
app.use(express.json());

// Configuração de CORS
const allowedOrigins = [
  'http://localhost:3000',  // Desenvolvimento local
  'https://sistema-de-agendamento-de-servicos.vercel.app', // Produção Vercel
  'https://sistema-de-agendamento-de-servicos.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Permite a origem
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));  // Bloqueia origens não permitidas
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Permite credenciais como cookies ou tokens
}));


// Rotas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api", debugRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com MongoDB
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(chalk.green.bold("✅ Conectado ao MongoDB"));
    app.listen(PORT, () => {
      console.log(chalk.blueBright.bold(`🚀 Servidor rodando na porta ${PORT}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red.bold("❌ Erro ao conectar com MongoDB:"), err);
  });
