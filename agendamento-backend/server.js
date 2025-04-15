require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");

const app = express();

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
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log(chalk.green.bold("✅ Conectado ao MongoDB"));
    app.listen(process.env.PORT || 5000, () => {
        console.log(
        chalk.blueBright.bold(
            `🚀 Servidor rodando na porta ${process.env.PORT || 5000}`
        )
    );
    });
    })
    .catch((err) => {
    console.error(chalk.red.bold("❌ Erro de conexão com o MongoDB:"), err);
});
