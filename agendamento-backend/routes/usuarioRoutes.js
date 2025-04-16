const express = require("express");
const router = express.Router();
const Usuario = require('../models/Usuario'); // Importa o modelo de usuário
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Rota para login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensagem: "Usuário não encontrado" });
        }

        // Compara as senhas
        const senhaCorreta = await usuario.compararSenha(senha);
        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: "Senha incorreta" });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario._id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
});

// Rota para cadastro
router.post("/cadastrar", async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado" });
        }

        // Cria um novo usuário
        const novoUsuario = new Usuario({
            nome,
            email,
            senha,
            tipo
        });

        // Salva o novo usuário no banco
        await novoUsuario.save();

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
    }
});

// Rota para listar todos os usuários
router.get("/listar", async (req, res) => {
  try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
  } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: "Erro ao listar usuários" });
  }
});
module.exports = router;
