const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
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
module.exports = router;
