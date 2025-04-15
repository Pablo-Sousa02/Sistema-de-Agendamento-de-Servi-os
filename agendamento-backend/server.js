require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // Declare 'app' antes de utilizá-lo

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const usuarioRoutes = require("./routes/usuarioRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/agendamentos", agendamentoRoutes);

// Conexão com o banco de dados
mongoose
.   connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Conectado ao MongoDB");
    // Inicia o servidor após a conexão com o banco de dados
    app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
    });
})
.catch((err) => {
    console.error("Erro de conexão com o MongoDB:", err);
});
